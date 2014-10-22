angular.module('ng-ratio').config(['$provide', function ($provide) {
  $provide.factory('confirm', ['$q', '$modal', function ($q, $modal) {
      return function (message) {
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
          }]
        });

        return dialog.result;
      };
  }]);
}]);
