goog.provide('ration.controller.trip');

goog.require('ration.repository.trip');
goog.require('ration.repository.ration');
goog.require('ration.repository.product');
goog.require('goog.array');


/**
 * @description Trip controller
 * @param {!angular.$scope} $scope
 * @param {!angular.$route} $route
 * @param {!ration.repository.trip} tripRepository
 * @param {!ration.repository.ration} rationRepository
 * @param {!ration.repository.product} productRepository
 * @param {!angular.$location} $location
 * @param {!ration.service.confirm} confirm
 * @constructor
 * @ngInject
 */
function TripController($scope, $route, tripRepository, rationRepository, productRepository, $location, confirm) {
	'use strict';

	if (productRepository.isEmpty() && tripRepository.isEmpty()) {
		$location.path ('/product');
		return;
	}

	var refreshTripList = function () {
		/**
		 * @expose
		 */
		$scope.trips = goog.object.getValues (tripRepository.findAll ());
		goog.array.sort ($scope.trips, function (a, b) {
			return (a.from < b.from);
		});

		/**
		 * @expose
		 */
		$scope.tripCount = $scope.trips.length;
	};

	refreshTripList ();

	if (goog.isDef ($route.current.params.id)) {
		$scope.Trip = tripRepository.find ($route.current.params.id);
		/**
		 * @expose
		 */
		$scope.editMode = true;
	} else {
		$scope.Trip = new Trip();
		$scope.Trip.plans.push (new Plan ());
	}
	/**
	 * @expose
	 */
	$scope.Trip;

	/**
	 * @expose
	 */
	$scope.addTrip = function () {
		var trip = this.Trip;

		trip.validate ();

		if (this.editMode) {
			tripRepository.save (trip);
		} else {
			tripRepository.save (goog.object.clone (trip));
		}

		$scope.planTrip (trip);
	};

	/**
	 * @expose
	 */
	$scope.editTrip = function (editableTrip) {
		$location.path("/edit/" + editableTrip.id);
	};


	/**
	 * @expose
	 */
	$scope.planTrip = function (editableTrip) {
		$location.path("/plan/" + editableTrip.id);
	};


	/**
	 * @expose
	 */
	$scope.addPlan = function () {
		$scope.Trip.plans.push (new Plan());
	};

	/**
	 * @expose
	 */
	$scope.removePlan = function (index) {
		$scope.Trip.plans.splice (index, 1);
	};

	/**
	 * @expose
	 */
	$scope.removeTrip = function (trip) {
		confirm('Удалить поход '+ trip.title + '?').then (angular.bind($scope, function () {
			tripRepository.remove (trip);
			this.trips = goog.array.filter (this.trips, function (item) {
				return item.id !== trip.id;
			});
			refreshTripList ();
		}));
	};

	/**
	 * @expose
	 */
	$scope.cloneTrip = function (trip) {
		var tripClone = trip.clone();
		tripRepository.save (tripClone);

		goog.array.forEach(rationRepository.findAll (trip.id), function (ration) {
			var index = rationRepository.findIndex (trip.id, ration.id);
			rationRepository.save (ration.clone (), tripClone.id, index);
		}, this);

		$location.path ('/edit/'+ tripClone.id);
	};

	/**
	 * @expose
	 */
	$scope.reportTrip = function (trip) {
		$location.path ('/report/' + trip.id);
	};

	/**
	 * @expose
	 */
	$scope.days = function () {
		var from = $scope.Trip.from, to = $scope.Trip.to;
		if (!goog.isObject(from)) {
			from = Date.parse (from);
		}

		if (!goog.isObject(to)) {
			to = Date.parse (to);
		}

		return Math.round (Math.abs (from - to)/24/3600/1000 + 1);
	};
}
