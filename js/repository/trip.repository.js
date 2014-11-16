goog.provide('ration.repository.trip');
goog.require('ration.service.storage');
goog.require('ration.repository.ration');
goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.asserts');

/**
 * @description Trip repository
 * @param {!LocalStorageService} storage
 * @param {!rationRepository} rationRepository
 * @constructor
 * @ngInject
 */
function RepositoryTrip (storage, rationRepository) {
	"use strict";

	var TRIP = 'trip';

	var find = function (id) {
		return restore([TRIP, id])[id];
	};

	var findAll = function () {
		return goog.object.getValues(restore(TRIP));
	};

	var restore = function (key) {
		var trips = storage.reconstitute(function () {
			return new Trip();
		}, key);

		goog.object.forEach(trips, function (trip) {
			trip.plans = goog.array.map(trip.plans, function (plan) {
				return storage.setObjectData(new Plan(), plan);
			});
		});

		return trips;
	};

	var saveTrip = function (trip) {
		goog.asserts.assert(!goog.string.isEmptyString(trip.id));

		// Рационы сохраняются в другом репозитории
		trip.rations = [];

		storage.set([TRIP, trip.id], trip);
	};

	var removeTrip = function (trip) {
		// сначала удаляем все связанные рационы
		goog.array.forEach(rationRepository.findAll(trip.id), function (ration) {
			rationRepository.remove(ration, trip.id);
		});

		// а в конце и сам поход
		storage.remove([TRIP, trip.id]);
	};

	var isEmpty = function () {
		var keys = storage.filterKeys(TRIP);
		return keys.length === 0;
	};

	return {
		isEmpty: isEmpty,
		find: find,
		findAll: findAll,
		save: saveTrip,
		remove: removeTrip
	};
}
