goog.require('goog.object');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('rationRepository', ['storage', function (storage) {
	"use strict";

	var KEY = 'ration';

	var key = function (tripId) {
		var data = goog.array.toArray (arguments);
		data.unshift (KEY);
		return data.join ('.');
	};

	var find = function (id) {
		return restore (key (id))[id];
	};

	var findAll = function (tripId) {
		return restore (key (tripId));
	};

	var findIndex = function (tripId, id) {
		var data = storage.get (key (tripId, id));
		return [data.day, data.meal];
	};

	var findAllBucket = function (tripId) {
		return restoreBucket (key (tripId));
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

		storage.set (key (tripId, ration.id), {
			ration: ration,
			day: index [0],
			meal: index [1]
		});
	};

	var removeRation = function (ration, tripId) {
		goog.asserts.assert (!goog.string.isEmptyString(ration.id));
		goog.asserts.assert (!goog.string.isEmptyString(tripId));

		storage.remove (key (tripId, ration.id));
	};

	return {
		find: find,
		findAll: findAll,
		findAllBucket: findAllBucket,
		findIndex: findIndex,
		save: saveRation,
		remove: removeRation
	};
}]);
