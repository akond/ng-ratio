goog.require('goog.array');

angular.module('trips').controller('TripCtrl', TripController);

TripController.$inject = ['$scope', '$route', 'tripRepository', 'rationRepository', '$location', 'confirm'];

function TripController($scope, $route, tripRepository, rationRepository, $location, confirm) {
	'use strict';

	var refreshTripList = function () {
		$scope.trips = goog.object.getValues (tripRepository.findAll ());
	}

	refreshTripList ();

	if (goog.isDef ($route.current.params.id)) {
		$scope.Trip = tripRepository.find ($route.current.params.id);
		$scope.editMode = true;
	} else {
		$scope.Trip = new Trip();
		$scope.Trip.plans.push (new Plan ());
	}

	$scope.addTrip = function () {
		var trip = this.Trip;

		trip.validate ();

		if (this.editMode) {
			tripRepository.save (trip);
		} else {
			tripRepository.save (goog.object.clone (trip));
		}

		$location.path("/plan/" + trip.id);
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
		confirm('Удалить поход?').then (angular.bind($scope, function () {
			tripRepository.remove (trip);
			this.trips = goog.array.filter (this.trips, function (item) {
				return item.id !== trip.id;
			});
		}));
	};

	$scope.cloneTrip = function (trip) {
		var tripClone = trip.clone();
		tripRepository.save (tripClone);

		goog.array.forEach(rationRepository.findAll (trip.id), function (ration) {
			var index = rationRepository.findIndex (trip.id, ration.id);
			rationRepository.save (ration.clone (), tripClone.id, index);
		}, this);

		refreshTripList ();
	};

	$scope.reportTrip = function (trip) {
		$location.path ('/report/' + trip.id);
	};
}
