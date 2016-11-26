'use strict';

angular.module('uptimizer.ultop', [
    'ngRoute',
    'uptimizer.simplex'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ultop', {
    templateUrl: 'ultop/ultop.html',
    controller: 'UltimateOptimizerCtrl'
  });
}])

.controller('UltimateOptimizerCtrl', ['$scope', 'SimplexService', function($scope, SimplexService) {
    $scope.objFxn = "";
    $scope.constraintsList = "";

    $scope.getInputs = function() {
        $scope.objFxn = $scope.objFxn.split("z =").pop().trim();

        //to delete!
        var testMatrix = [
            [7, 11, 1, 0, 0, 0, 0, 77],
            [10, 8, 0, 1, 0, 0, 0, 80],
            [1, 0, 0, 0, 1, 0, 0, 9],
            [0, 1, 0, 0, 0, 1, 0, 6],
            [-150, -175, 0, 0, 0, 0, 1, 0]
        ];

        for(var i=0; i<testMatrix.length; i++){
            console.log(testMatrix[i]);
        }
        // console.log($scope.objFxn.split(" "));
        // console.log(testMatrix);
        SimplexService.simplex(testMatrix);
   }
}]);
