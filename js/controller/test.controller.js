angular.module('trips').controller('TestCtrl', TestController);

TestController.$inject = ['$scope', 'storage'];

function TestController ($scope, storage) {
    $scope.reset = function () {
        storage.reset();
    };
}
