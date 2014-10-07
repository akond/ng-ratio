angular.module('local-storage').config(['$provide', function ($provide) {
  $provide.factory('confirm', ['$modal', function ($modal) {
      return function () {
        var dialog = $modal.open({
          'templateUrl': 'partials/confirm.html',
          'controller': ['$scope', '$modalInstance', function($scope, $modalInstance) {
            $scope.ok = function(feedback) {
              $modalInstance.close();
            };

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
            };
          }],
        });

        dialog.result.then(function () {
          // ok function
          alert ('yes')
        });
      }
  }]);
}]);
