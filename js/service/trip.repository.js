goog.require('goog.object');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('tripRepository', ['storage', function (storage) {
  "use strict";

  var KEY = 'trips';

  var find = function (id) {
    return restore () [id];
  };

  var findAll = function () {
    return goog.object.getValues(restore ());
  };

  var restore = function () {
    return storage.reconstitute (function () {
      return new Trip ();
    }, KEY);
  };

  var save = function (container) {
    storage.set (KEY, container);
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

  return {
    find: find,
    findAll: findAll,
    add: addTrip,
    remove: removeTrip
  };
}]);
