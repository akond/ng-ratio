angular.module('local-storage', ['ngRoute', 'storage', 'slideMenu', 'help', 'trips']);

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
      otherwise({
        redirectTo: '/help'
      });
  }]);
