goog.require('goog.array');

angular.module('trips').controller('ReportCtrl', ReportController);
ReportController.$inject = ['$scope', '$route', 'tripRepository', 'productRepository', 'rationRepository', '$location', '$filter', 'resize', 'productFilter'];

function ReportController($scope, $route, tripRepository, productRepository, rationRepository, $location, $filter, resize, productFilter) {
	'use strict';

	var tripId = $route.current.params.id;

	var trip = $scope.Trip = tripRepository.find (tripId);
}
