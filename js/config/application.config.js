angular.module('ng-ratio', ['ngRoute', 'ui.bootstrap', 'mgo-angular-wizard', 'slideMenu', 'trips', 'ngDialog']);

angular.module('ng-ratio').run (['$rootScope', function ($rootScope) {
  $rootScope.debug = 1;
}]).constant ('debug', 1);
