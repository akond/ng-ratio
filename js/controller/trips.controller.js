goog.require('goog.array');

angular.module('trips', ['LocalStorageModule']);
angular.module('trips').controller('TripCtrl', TripController);

TripController.$inject = ['$scope', 'tripRepository', '$rootScope', '$location', 'confirm', 'WizardHandler'];

function TripController($scope, tripRepository, $rootScope, $location, confirm, WizardHandler) {
	'use strict';

	$scope.trips = goog.object.getValues (tripRepository.findAll ());

	$scope.trip = new Trip();

	$scope.addTrip = function () {
		tripRepository.add (this.trip);
		this.trips [this.trip.id] = this.trip;
		this.trip = new Trip();
		$location.path("/");
	};

	$scope.removeTrip = function (trip) {
		confirm('Are you sure to remove this trip?').then (angular.bind($scope, function () {
			tripRepository.remove (trip);
			this.trips = goog.array.filter (this.trips, function (item) {
				return item.id !== trip.id;
			})
		}));
	};
}
