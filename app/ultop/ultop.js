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
        "valuesList" : []
    };
    $scope.constraint = {
        "slackList" : [],
        "constraintsList" : []
    };
    $scope.isOFDefined = false;

    $scope.defineObjFxn = function() {
        var oF = $scope.inputOF.split("z =").pop().trim();
        var oFArray = oF.split(" + ");
        var returnObject = {
        };

        for(var i = 0; i < oFArray.length; i++) {
            var spl = oFArray[i].split(" * ");
            $scope.objFxn.variableList.push(spl[1]);
            $scope.objFxn.valuesList.push(parseInt(spl[0])*-1);
        }

        $scope.isOFDefined = true;
    };

    $scope.removeObjFxn = function() {
        $scope.inputOF = "";
        $scope.objFxn = {
            "variableList" : [],
            "valuesList" : []
        };
        $scope.constraint = {
            "slackList" : [],
            "constraintsList" : []
        };
        $scope.isOFDefined = false;
    };

    $scope.addConstraint = function() {
        //TODO finalize first if min or max then obj func.
        $scope.constraint.slackList.push(
            "s" + ($scope.constraint.constraintsList.length+1));
        //change into value array
        //check if max or min then split on that
        $scope.constraint.constraintsList.push(
            $scope.inputConstraint.split(" <= "));
        $scope.inputConstraint= "";
    };

    $scope.getInputs = function() {
        var inputTableau = SimplexTools.createTableau(
            $scope.objFxn.valuesList, $scope.constraint.constraintsList,
            $scope.objFxn.variableList
        );

        //define the headers
        // var columnHeaders =
        //     SimplexTools.createColumnHeaders(
        //         $scope.objFxn.variableList, $scope.);
        //
        // console.log(columnHeaders);

        //console.log(zInput.split(" + "));
        //to delete!
        var testMatrix = [
            [7, 11, 1, 0, 0, 0, 0, 77],
            [10, 8, 0, 1, 0, 0, 0, 80],
            [1, 0, 0, 0, 1, 0, 0, 9],
            [0, 1, 0, 0, 0, 1, 0, 6],
            [-150, -175, 0, 0, 0, 0, 1, 0]
        ];
        // var returnObject = SimplexService.simplex(testMatrix, ["x1", "x2", "s1", "s2", "s3", "s4","z","ans"]);

        // for(var i=0; i<returnObject.tableau.length; i++){
        //     console.log(returnObject.tableau[i]);
        // }
   }
}]);
