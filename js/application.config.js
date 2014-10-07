angular.module('local-storage', ['ngRoute', 'ui.bootstrap', 'mgo-angular-wizard', 'slideMenu', 'help', 'trips', 'test']);

angular.module('local-storage').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/trips.html',
        controller: 'TripsCtrl'
      }).
      when('/new', {
        templateUrl: 'partials/new.html',
        controller: 'TripsCtrl'
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
