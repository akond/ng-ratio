angular.module('trips').controller('TestCtrl', TestController);

TestController.$inject = ['$scope', 'storage', 'tripRepository', 'rationRepository'];

function TestController ($scope, storage, tripRepository, rationRepository) {
    $scope.reset = function () {
        storage.reset();
    };

    $scope.saveRation = function () {
    };
}
