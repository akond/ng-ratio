angular.module('ng-ratio').config(['$provide', function ($provide) {
	$provide.factory('storage', ['localStorageService', function (localStorageService) {
		var keys = function () {
			return localStorageService.keys();
		};

		var filterKeys = function (filter) {
			var r = new RegExp("^" + filter );
			return goog.array.filter (keys (), function (key) {
				return r.test (key);
			});
		};

		var set = function (key, value) {
			localStorageService.set (key, angular.toJson (value));
		};

		var remove = function (key) {
			localStorageService.remove (key);
		};

		var get = function (key) {
			var value = localStorageService.get (key);
			if (value) {
				return angular.fromJson (value);
			}
		};

		var reconstitute = function (factory, prefix) {
			var values = goog.array.map (filterKeys (prefix), function (key) {
				return get (key);
			});

			return goog.array.toObject(goog.array.map(values, function (item) {
				var object = factory ();
				goog.object.forEach (item, function (value, key) {
					goog.object.set(object, key, value);
				});
				return object;
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
			reconstitute: reconstitute
		};
	}]);
}]);
