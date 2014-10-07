angular.module('local-storage', ['ngRoute', 'storage', 'slideMenu', 'help']);

angular.module('local-storage').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/help', {
        templateUrl: 'partials/help.html',
        controller: 'HelpCtrl'
      }).
      otherwise({
        redirectTo: '/help'
      });
  }]);
