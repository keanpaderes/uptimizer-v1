'use strict';

// Declare app level module which depends on views, and components
angular.module('uptimizer', [
  'ngRoute',
  'uptimizer.ultop',
  'uptimizer.dietsolv',
  'uptimizer.version',
  'uptimizer.simplex-service',
  'uptimizer.simplex-tools'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/ultop'});
}]);
