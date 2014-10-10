goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('tripRepository', ['localStorageService', function (localStorage) {
  "use strict";

  var KEY = 'trips';


  var find = function (id) {
    return restore () [id];
  };

  var findAll = function () {
    return goog.object.getValues(restore ());
  };

  var addTrip = function (trip) {
    goog.asserts.assert (trip.id != '');

    var container = restore ();
    container [trip.id] = trip;
    save (container);
  };

  var removeTrip = function (trip) {
    var container = restore ();
    delete (container [trip.id]);
    save (container);
  };

  var save = function (container) {
    localStorage.set (KEY, angular.toJson (container));
  };

  var restore = function () {
    var values = [];
    if (localStorage.get (KEY)) {
      values = angular.fromJson (localStorage.get (KEY));
    }

    return goog.object.map(values, function (item, key) {
      var trip = new Trip ();
      goog.object.forEach (item, function (value, key) {
        goog.object.set(trip, key, value);
      });
      return trip;
    });
  };


  return {
    find: find,
    findAll: findAll,
    add: addTrip,
    remove: removeTrip
  };
}]);
