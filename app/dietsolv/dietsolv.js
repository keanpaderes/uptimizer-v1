'use strict';

angular.module('uptimizer.dietsolv', [
    'ngRoute',
    'uptimizer.simplex-service',
    'uptimizer.simplex-tools'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dietsolv', {
    templateUrl: 'dietsolv/dietsolv.html',
    controller: 'DietSolverCtrl'
  });
}])

.controller('DietSolverCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.foodArray = [];
    $scope.foodStatus = [];
    $scope.constraintArray = [];

    $scope.hide = false;

    $http.get('assets/foods.json').then(function(data) {
        $scope.foodArray = data.data;
        for(var i = 0; i < $scope.foodArray.length; i++) {
            $scope.foodStatus.push(false);
        }
    });



}]);
