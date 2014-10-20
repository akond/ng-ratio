goog.require('goog.object');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('rationRepository', ['storage', function (storage) {
	"use strict";

	var KEY = 'ration';

	var find = function (id) {
		return restore (KEY + "." + id)[id];
	};

	var findAll = function (tripId) {
		return restore (KEY + "." + tripId);
	};

	var findAllBucket = function (tripId) {
		return restoreBucket (KEY + "." + tripId);
	};

	var restoreBucket = function (key) {
		var rationData = goog.array.map (storage.filterKeys (key), function (key) {
			return storage.get (key);
		});

		var days = goog.array.bucket (rationData, function (data) {
			return data.day;
		});

		days = goog.object.map(days, function (day) {
			return goog.array.bucket (goog.object.getValues (day), function (day) {
				 return day.meal;
			});
		});

		goog.object.forEach (days, function (day, dayIndex) {
			goog.object.forEach (day, function (meal, mealIndex) {
				day [mealIndex] = goog.array.map (meal, function (data) {
					var rationData = data.ration;

					var ration = new Ration ();
					ration.id = rationData.id;
					ration.product = rationData.product;
					ration.amount = rationData.amount;
					return ration;
				});
			});
		});

		return days;
	};

	var restore = function (key) {
		var rationData = goog.array.map (storage.filterKeys (key), function (key) {
			return storage.get (key);
		});

		return goog.array.map (rationData, function (data) {
			var rationData = data.ration;

			var ration = new Ration ();
			ration.id = rationData.id;
			ration.product = rationData.product;
			ration.amount = rationData.amount;
			return ration;
		});
	};

	var saveRation = function (ration, tripId, index) {
		goog.asserts.assert (!goog.string.isEmptyString(tripId));
		goog.asserts.assertArray (index);
		goog.asserts.assert (!goog.string.isEmptyString(ration.id));

		var key = [KEY, tripId, ration.id].join (".");
		storage.set (key, {
			ration: ration,
			day: index [0],
			meal: index [1]
		});
	};

	var removeRation = function (ration, tripId) {
		goog.asserts.assert (!goog.string.isEmptyString(ration.id));
		goog.asserts.assert (!goog.string.isEmptyString(tripId));

		var key = [KEY, tripId, ration.id].join (".");
		storage.remove (key);
	};

	return {
		find: find,
		findAll: findAll,
		findAllBucket: findAllBucket,
		save: saveRation,
		remove: removeRation
	};
}]);
