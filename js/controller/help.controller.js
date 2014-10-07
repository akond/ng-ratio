angular.module('help', []).controller('HelpCtrl', HelpController);

HelpController.$inject = ['$scope'];

function HelpController ($scope) {
    $scope.message = 'This is a help message';
}
