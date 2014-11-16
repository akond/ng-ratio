goog.provide('ration.controller.report');
goog.require('goog.array');

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

	$scope.isEmpty = function () {
		return goog.object.getCount ($scope.groups) === 0;
	};
}
