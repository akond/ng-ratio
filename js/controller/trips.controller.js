goog.require('goog.array');

angular.module('trips', ['LocalStorageModule']);
angular.module('trips').controller('TripsCtrl', StorageController);

StorageController.$inject = ['$scope', 'localStorageService', '$rootScope', '$location', 'confirm'];

function StorageController($scope, localStorage, $rootScope, $location, confirm) {
	'use strict';

	$scope.tripContainer = TripContainer.createFrom(localStorage.get('trips'));

	goog.array.forEach($scope.tripContainer.toArray(), function (trip) {
		trip.test();
	});

	$scope.trips = function () {
		return $scope.tripContainer.export();
	}

	$scope.addTrip = function () {
		$scope.tripContainer.add(new Trip($scope.title));
		$scope.keepState();
		$scope.title = undefined;

		$location.path("/");
	}

	$scope.removeTrip = function (trip) {
		if (confirm('Are you sure?')) {
			//$scope.tripContainer.remove(trip);
			//this.keepState();
		}
	}

	$scope.keepState = function () {
		localStorage.set('trips', $scope.tripContainer.export());
	}
}
