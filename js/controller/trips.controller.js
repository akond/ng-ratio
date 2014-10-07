goog.require('goog.array');

angular.module('trips', ['LocalStorageModule']);
angular.module('trips').controller('TripsCtrl', StorageController);

StorageController.$inject = ['$scope', 'localStorageService', '$rootScope'];

function StorageController($scope, localStorage, $rootScope) {
	'use strict';

	$scope.tripContainer = TripContainer.createFrom(localStorage.get('trips'));

	goog.array.forEach($scope.tripContainer.toArray(), function (trip) {
		trip.test();
	});

	this.trips = function () {
		return $scope.tripContainer.export();
	}

	this.addTrip = function () {
		$scope.tripContainer.add(new Trip($scope.title));
		this.keepState();
		$scope.title = undefined;
	}

	this.removeTrip = function (trip) {
		if (confirm('Are you sure?')) {
			$scope.tripContainer.remove(trip);
			this.keepState();
		}
	}

	this.keepState = function () {
		localStorage.set('trips', $scope.tripContainer.export());
	}
}
