goog.require('goog.object');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('tripRepository', ['storage', 'rationRepository', function (storage, rationRepository) {
    "use strict";

    var KEY = 'trip';

    var find = function (id) {
        return restore (KEY + "." + id)[id];
    };

    var findAll = function () {
        return goog.object.getValues(restore (KEY));
    };

    var restore = function (key) {
        var trips = storage.reconstitute (function () {
            return new Trip ();
        }, key);

        goog.object.forEach (trips, function (trip) {
            trip.rations = rationRepository.findAll (trip.id);
        });

        return trips;
    };

    var saveTrip = function (trip) {
        goog.asserts.assert (trip.id != null);

        // Рационы сохраняются в другом репозитории
        var rations = trip.rations;
        trip.rations = [];

        storage.set (KEY + "." + trip.id, trip);
    };

    var removeTrip = function (trip) {
        storage.remove (KEY + "." + trip.id);
    };

    return {
        find: find,
        findAll: findAll,
        save: saveTrip,
        remove: removeTrip
    };
}]);
