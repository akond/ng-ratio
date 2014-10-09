goog.require('goog.array');

angular.module('trips', ['LocalStorageModule']);
angular.module('trips').controller('TripCtrl', TripController);

TripController.$inject = ['$scope', 'tripRepository', '$rootScope', '$location', 'confirm', 'WizardHandler'];

function TripController($scope, tripRepository, $rootScope, $location, confirm, WizardHandler) {
	'use strict';

	$scope.trips = goog.object.getValues (tripRepository.findAll ());

	//var tripTemplate = new Trip('new');
	$scope.trip = new Trip('new');

	$scope.addTen = function () {
		goog.array.forEach (goog.array.range (7), angular.bind($scope, function () {
			var trip = new Trip (Lorem.getSentence());
			tripRepository.add (trip);
			this.trips.push(trip);
		}));
	};

	$scope.addTrip = function () {
		var clone = goog.object.clone (this.trip);
		tripRepository.add (clone);
		//this.trips (this.trip);

		$location.path("/");
	};

	$scope.editTrip = function (trip) {

		$scope.trip = trip;

		this.trip = trip;
		$location.path("/new");
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
