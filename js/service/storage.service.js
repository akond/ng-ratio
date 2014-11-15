goog.provide('ration.service.storage');
goog.require('goog.array');

/**
 * @description App configuration
 * @param {!angular.localStorageService} localStorageService
 * @constructor
 * @ngInject
 */
function LocalStorageService(localStorageService) {
	var adjustKey = function (key) {
		if (goog.isArray(key)) {
			return key.join('.');
		}

		return key;
	};

	var keys = function () {
		return localStorageService.keys();
	};

	var filterKeys = function (filter) {
		var r = new RegExp("^" + adjustKey(filter));
		return goog.array.filter(keys(), function (key) {
			return r.test(key);
		});
	};

	var set = function (key, value) {
		localStorageService.set(adjustKey(key), angular.toJson(value));
	};

	var remove = function (key) {
		localStorageService.remove(adjustKey(key));
	};

	var get = function (key) {
		var value = localStorageService.get(adjustKey(key));
		if (value) {
			return angular.fromJson(value);
		}
	};

	var setObjectData = function (object, data) {
		goog.object.forEach(object, function (value, key) {
			if (goog.isDef(data [key])) {
				goog.object.set(object, key, data [key]);
			}
		});

		return object;
	};

	var recreate = function (values, factory) {
		return goog.array.toObject(goog.array.map(values, function (item) {
			var object = factory();
			return setObjectData(object, item);
		}), function (item) {
			return item.id;
		});
	};

	var reconstitute = function (factory, prefix) {
		var values = goog.array.map(filterKeys(prefix), function (key) {
			return get(key);
		});

		return recreate(values, factory);
	};

	var reset = function () {
		localStorageService.clearAll();
	};

	var isEmpty = function () {
		return goog.array.isEmpty(keys());
	};

	return {
		keys: keys,
		filterKeys: filterKeys,
		set: set,
		get: get,
		remove: remove,
		reset: reset,
		reconstitute: reconstitute,
		recreate: recreate,
		setObjectData: setObjectData,
		isEmpty: isEmpty
	};
};
