'use strict';

angular.module('uptimizer.ultop', [
    'ngRoute',
    'uptimizer.simplex-service',
    'uptimizer.simplex-tools'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ultop', {
    templateUrl: 'ultop/ultop.html',
    controller: 'UltimateOptimizerCtrl'
  });
}])

.controller('UltimateOptimizerCtrl', ['$scope',
    'SimplexService', 'SimplexTools',
    function($scope, SimplexService, SimplexTools) {

    $scope.inputOF = "";
    $scope.inputConstraint= "";
    $scope.objFxn = {
        "variableList" : [],
        "valuesList" : [],
        "sign" : "1"
    };
    $scope.constraint = {
        "slackList" : [],
        "constraintsList" : []
    };
    $scope.minMax = "none";
    $scope.isOFDefined = false;
    $scope.isMaxMinDefined = false;
    $scope.isResultComputed = false;
    $scope.showWarn = false;
    $scope.showError = [false, false];
    $scope.showTips = [true, true];

    $scope.currentPage = 0;
    $scope.basicSolution = {};
    $scope.solutionTableau = [];
    $scope.solutionHeaders = [];
    $scope.solutionValues = [];

    $scope.defineObjFxn = function() {
        var oF = $scope.inputOF.split("z =").pop().trim();
        var oFArray = oF.split(" + ");
        var returnObject = {
        };

        for(var i = 0; i < oFArray.length; i++) {
            var spl = oFArray[i].split(" * ");
            $scope.objFxn.variableList.push(spl[1]);
            $scope.objFxn.valuesList.push(parseInt(spl[0]));
        }

        $scope.isOFDefined = true;
    };

    $scope.removeObjFxn = function() {
        $scope.inputOF = "";
        $scope.inputConstraint= "";
        $scope.objFxn = {
            "variableList" : [],
            "valuesList" : []
        };
        $scope.constraint = {
            "slackList" : [],
            "constraintsList" : []
        };
        $scope.minMax = "none";
        $scope.isOFDefined = false;
        $scope.isMaxMinDefined = false;
        $scope.isResultComputed = false;
        $scope.showWarn = false;
        $scope.showError = [false, false];

        $scope.currentPage = 0;
        $scope.basicSolution = {};
        $scope.solutionTableau = [];
        $scope.solutionHeaders = [];
        $scope.solutionValues = [];
    };


    $scope.addConstraint = function() {
        if($scope.minMax == "min"){
            if($scope.inputConstraint.includes(" >= ")){
                $scope.constraint.slackList.push(
                    "s" + ($scope.constraint.constraintsList.length+1));

                var constraintArray = $scope.inputConstraint.split(" >= ");
                constraintArray.push("1");
                $scope.constraint.constraintsList.push(constraintArray);
            } else {
                $scope.showError[0] = true;
            }
        } else{
            $scope.constraint.slackList.push(
                "s" + ($scope.constraint.constraintsList.length+1));

            if($scope.inputConstraint.includes(" <= ")){
                var constraintArray = $scope.inputConstraint.split(" <= ");
                constraintArray.push("1");
                $scope.constraint.constraintsList.push(constraintArray);
            } else {
                var constraintArray = $scope.inputConstraint.split(" >= ");
                constraintArray.push("-1");
                $scope.constraint.constraintsList.push(constraintArray);
            }
        }

        $scope.inputConstraint= "";
    };

    $scope.removeConstraints = function() {
        $scope.constraint.slackList = [];
        $scope.constraint.constraintsList = [];
    };


    $scope.getInputs = function() {
        var inputObj = {};

        if($scope.constraint.constraintsList.length == 0){
            $scope.showError[1] = true;
        } else {
            if($scope.minMax == "max") {
                inputObj.inputTableau = SimplexTools.createTableau(
                    $scope.objFxn.valuesList, $scope.constraint.constraintsList,
                    $scope.objFxn.variableList
                );
                inputObj.inputHeaders = angular.copy($scope.objFxn.variableList)
                    .concat($scope.constraint.slackList).concat(['z', "ans"]);
            } else {
                var augCoeff = SimplexTools.createAugCoeff(
                    $scope.objFxn.valuesList, $scope.constraint.constraintsList,
                    $scope.objFxn.variableList
                );
                inputObj = SimplexTools.convertToDualMaximization(augCoeff);
            }

            $scope.results = SimplexService.simplex(
                inputObj.inputTableau, inputObj.inputHeaders);

            $scope.isResultComputed = true;
        }
   }

   $scope.$watch('isResultComputed', function(isResultComputed) {
       if(isResultComputed){
           $scope.basicSolution = $scope.results.solutionArray[$scope.currentPage];
           $scope.solutionTableau = $scope.basicSolution.iteTableau;
           $scope.solutionHeaders = $scope.basicSolution.headers;
           $scope.solutionValues = $scope.basicSolution.values;
       }
   });

   $scope.$watch('minMax', function(minMax) {
       if(minMax != "none"){
           if(minMax == "max"){
               //multiply *-1 by values list
               for(var i = 0; i < $scope.objFxn.valuesList.length; i++){
                   $scope.objFxn.valuesList[i] =
                    $scope.objFxn.valuesList[i] * -1;
               }
           } else {
               $scope.showWarn = true;
           }
       }
   });

   $scope.$watch('currentPage', function(currentPage) {
        if($scope.isResultComputed){
            $scope.basicSolution = $scope.results.solutionArray[$scope.currentPage];
            $scope.solutionTableau = $scope.basicSolution.iteTableau;
            $scope.solutionHeaders = $scope.basicSolution.headers;
            $scope.solutionValues = $scope.basicSolution.values;
        }
   });
}]);
