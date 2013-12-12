'use strict';

angular.module('southhighApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/graph', {
        templateUrl: 'views/graph.html',
        controller: 'GraphCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
