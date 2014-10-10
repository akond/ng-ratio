angular.module('ng-ratio').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/trip-list.html',
        controller: 'TripCtrl'
      }).
      when('/new', {
        templateUrl: 'partials/trip.html',
        controller: 'TripCtrl'
      }).
      when('/edit/:id', {
        templateUrl: 'partials/trip.html',
        controller: 'TripCtrl'
      }).
      when('/plan/:id', {
        templateUrl: 'partials/plan.html',
        controller: 'PlanCtrl'
      }).
      when('/help', {
        templateUrl: 'partials/help.html',
        controller: 'HelpCtrl'
      }).
      when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'TestCtrl'
      }).
      otherwise({
        redirectTo: '/help'
      });
  }]);
