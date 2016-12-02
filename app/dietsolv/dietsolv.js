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

.controller('DietSolverCtrl', [function() {

}]);
