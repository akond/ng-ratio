goog.require('goog.array');
goog.require('goog.iter');
goog.require('goog.date.Date');
goog.require('goog.date.DateTime');
goog.require('goog.date.DateRange');
goog.require('goog.date.DateRange.Iterator');



angular.module('trips').controller('PlanCtrl', PlanController);

PlanController.$inject = ['$scope', '$route', 'tripRepository', '$location', 'confirm'];

function PlanController($scope, $route, tripRepository, $location, confirm) {
	'use strict';

	var trip = $scope.Trip = tripRepository.find ($route.current.params.id);

	$scope.days = (function () {
		var start = goog.date.DateTime.fromRfc822String (trip.from);
		start = new goog.date.Date (start.getYear(), start.getMonth(), start.getDate ());
		var end = goog.date.DateTime.fromRfc822String (trip.to);
		end = new goog.date.Date (end.getYear(), end.getMonth(), end.getDate ());

		var daterange = new goog.date.DateRange(start, end);
		return goog.array.map(goog.iter.toArray(daterange.iterator()), function (date) {
			return date.date;
		});
	})();
}
