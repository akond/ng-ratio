angular.module('ng-ratio', ['ngRoute', 'ui.bootstrap', 'mgo-angular-wizard', 'slideMenu', 'help', 'trips']);

angular.module('ng-ratio').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/trips.html',
        controller: 'TripCtrl'
      }).
      when('/new', {
        templateUrl: 'partials/new.html',
        controller: 'TripCtrl'
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
