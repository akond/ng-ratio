angular.module('ng-ratio').config(['$provide', function ($provide) {
	$provide.factory('storage', ['localStorageService', function (localStorageService) {

		var adjustKey = function (key) {
			if (goog.isArray (key)) {
				return key.join ('.');
			}

			return key;
		}

		var keys = function () {
			return localStorageService.keys();
		};

		var filterKeys = function (filter) {
			var r = new RegExp("^" + adjustKey(filter) );
			return goog.array.filter (keys (), function (key) {
				return r.test (key);
			});
		};

		var set = function (key, value) {
			localStorageService.set (adjustKey(key), angular.toJson (value));
		};

		var remove = function (key) {
			localStorageService.remove (adjustKey(key));
		};

		var get = function (key) {
			var value = localStorageService.get (adjustKey(key));
			if (value) {
				return angular.fromJson (value);
			}
		};

		var setObjectData = function (object, data) {
			goog.object.forEach (data, function (value, key) {
				goog.object.set(object, key, value);
			});

			return object;
		};

		var reconstitute = function (factory, prefix) {
			var values = goog.array.map (filterKeys (prefix), function (key) {
				return get (key);
			});

			return goog.array.toObject(goog.array.map(values, function (item) {
				var object = factory ();
				return setObjectData (object, item);
			}), function (item) {
				return item.id;
			});
		};

		var reset = function () {
			localStorageService.clearAll();
		};

		return {
			keys: keys,
			filterKeys: filterKeys,
			set: set,
			get: get,
			remove: remove,
			reset: reset,
			reconstitute: reconstitute,
			setObjectData: setObjectData
		};
	}]);
}]);
