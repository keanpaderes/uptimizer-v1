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

.controller('UltimateOptimizerCtrl', ['$scope', 'SimplexService', function($scope, SimplexService) {
    $scope.objFxn = "";
    $scope.constraintsList = "";

    $scope.checkInputs = function() {

    };

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
        var returnObject = SimplexService.simplex(testMatrix, ["x1", "x2", "s1", "s2", "s3", "s4","z","ans"]);

        console.log(returnObject);
   }
}]);
