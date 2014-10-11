goog.require('goog.object');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('tripRepository', ['storage', function (storage) {
    "use strict";

    var KEY = 'trip';

    var find = function (id) {
        return restore (KEY + "." + id)[id];
    };

    var findAll = function () {
        return goog.object.getValues(restore (KEY));
    };

    var restore = function (key) {
        return storage.reconstitute (function () {
            return new Trip ();
        }, key);
    };

    var addTrip = function (trip) {
        goog.asserts.assert (trip.id != null);
        storage.set (KEY + "." + trip.id, trip);
    };

    var removeTrip = function (trip) {
        storage.remove (KEY + "." + trip.id);
    };

    return {
        find: find,
        findAll: findAll,
        add: addTrip,
        remove: removeTrip
    };
}]);
