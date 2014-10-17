angular.module('ng-ratio', ['ngRoute', 'ui.bootstrap', 'mgo-angular-wizard', 'slideMenu', 'trips']);

angular.module('ng-ratio').run (['$rootScope', function ($rootScope) {
  $rootScope.debug = 1;
}]).constant ('debug', 1);
