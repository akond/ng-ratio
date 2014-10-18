goog.require('goog.array');

angular.module('trips').controller('ReportCtrl', ReportController);
ReportController.$inject = ['$scope', '$route', 'tripRepository', 'productRepository', 'rationRepository', '$location', '$filter', 'resize', 'productFilter'];

function ReportController($scope, $route, tripRepository, productRepository, rationRepository, $location, $filter, resize, productFilter) {
	'use strict';

	var tripId = $route.current.params.id;

	var trip = $scope.Trip = tripRepository.find (tripId);

	var products = $scope.products = productRepository.getIndex ();

	var groups = goog.array.bucket (rationRepository.findAll (tripId), function (ration) {
		return products [ration.product].group;
	});

	$scope.groups = goog.object.map (groups, function (rations, title) {
		var meal = new Meal (title, []);
		goog.array.forEach (rations, function (ration) {
			this.addRation (ration);
		}, meal);
		return meal;
	});
}
