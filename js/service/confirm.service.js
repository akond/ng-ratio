angular.module('ng-ratio').config(['$provide', function ($provide) {
  $provide.factory('confirm', ['$q', '$modal', 'debug', function ($q, $modal, debug) {
      return function (message) {
        if (debug) {
          var defer = $q.defer();
          defer.resolve (true);
          return defer.promise;
        }
        
        var dialog = $modal.open({
          'templateUrl': 'partials/confirm.html',
          'controller': ['$scope', '$modalInstance', function($scope, $modalInstance) {

            $scope.message = message;

            $scope.ok = function(feedback) {
              $modalInstance.close();
            };

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
            };
          }],
        });

        return dialog.result;
      };
  }]);
}]);
