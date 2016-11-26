'use strict';

// Declare app level module which depends on views, and components
angular.module('uptimizer', [
  'ngRoute',
  'uptimizer.ultop',
  'uptimizer.view2',
  'uptimizer.version',
  'uptimizer.simplex'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/ultop'});
}]);
