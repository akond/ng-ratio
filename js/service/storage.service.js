angular.module('ng-ratio').config(['$provide', function ($provide) {
  $provide.factory('storage', ['localStorageService', function (localStorageService) {
      var set = function (key, value) {
          localStorageService.set (key, angular.toJson (value));
      };

      var get = function (key) {
          var value = localStorageService.get (key);
          if (value) {
              return angular.fromJson (value);
          }
      };

      var reconstitute = function (factory, values) {
        if (goog.typeOf (values) === 'string') {
          values = get (values);
        }

        return goog.object.map(values, function (item, key) {
          var object = factory ();
          goog.object.forEach (item, function (value, key) {
            goog.object.set(object, key, value);
          });
          return object;
        });
      };

      return {
        set: set,
        get: get,
        reconstitute: reconstitute
      };
  }]);
}]);
