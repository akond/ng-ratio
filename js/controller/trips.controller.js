goog.require('goog.array');

angular.module('trips', ['LocalStorageModule']);
angular.module('trips').controller('TripCtrl', TripController);

TripController.$inject = ['$scope', 'localStorageService', '$rootScope', '$location', 'confirm', 'WizardHandler'];

function TripController($scope, localStorage, $rootScope, $location, confirm, WizardHandler) {
	'use strict';

	$scope.tripContainer = TripContainer.createFrom(localStorage.get('trips'));

	goog.array.forEach($scope.tripContainer.toArray(), function (trip) {
		trip.test();
	});

	$scope.trip = new Trip();

	$scope.trips = function () {
		return $scope.tripContainer.export();
	}

	$scope.addTrip = function () {
		$scope.tripContainer.add(this.trip);
		$scope.keepState();
		this.trip = new Trip();
		$location.path("/");
	}

	$scope.removeTrip = function (trip) {
		if (confirm('Are you sure to remove this trip?')) {
			//$scope.tripContainer.remove(trip);
			//this.keepState();
		}
	}

	$scope.keepState = function () {
		localStorage.set('trips', $scope.tripContainer.export());
	}
}
