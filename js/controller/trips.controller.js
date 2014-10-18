goog.require('goog.array');

angular.module('trips', ['LocalStorageModule']);
angular.module('trips').controller('TripCtrl', TripController);

TripController['$inject'] = ['$scope', '$route', 'tripRepository', '$rootScope', '$location', 'confirm'];

function TripController($scope, $route, tripRepository, $rootScope, $location, confirm) {
	'use strict';

	$scope.trips = goog.object.getValues (tripRepository.findAll ());

	if (goog.isDef ($route.current.params.id)) {
			$scope.Trip = tripRepository.find ($route.current.params.id);
			$scope.editMode = true;
	} else {
			$scope.Trip = new Trip();
			$scope.Trip.plans.push (new Plan ());
	}

	$scope.addTrip = function () {
		this.Trip.validate ();

		if (this.editMode) {
			tripRepository.save (this.Trip);
		} else {
			tripRepository.save (goog.object.clone (this.Trip));
		}

		$location.path("/plan/" + this.Trip.id);
	};

	$scope.editTrip = function (editableTrip) {
		$location.path("/edit/" + editableTrip.id);
	};

	$scope.addPlan = function () {
			$scope.Trip.plans.push (new Plan());
	};

	$scope.removePlan = function (index) {
			$scope.Trip.plans.splice (index, 1);
	};

	$scope.removeTrip = function (trip) {
		confirm('Are you sure to remove this trip?').then (angular.bind($scope, function () {
			tripRepository.remove (trip);
			this.trips = goog.array.filter (this.trips, function (item) {
				return item.id !== trip.id;
			});
		}));
	};
}
