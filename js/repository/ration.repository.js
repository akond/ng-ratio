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

    var restore = function (key) {
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
                })
            });
        });

        return days;
    };

    var saveRation = function (ration, tripId, day, meal) {
        goog.asserts.assert (tripId != null);
        goog.asserts.assertNumber (day);
        goog.asserts.assertNumber (meal);
        goog.asserts.assert (ration.id != null);

        var key = [KEY, tripId, ration.id].join (".");
        storage.set (key, {
            ration: ration,
            day: day,
            meal: meal
        });
    };

    var removeRation = function (ration, tripId, day, meal) {
        goog.asserts.assert (tripId != null);
        goog.asserts.assertNumber (day);
        goog.asserts.assertNumber (meal);
        goog.asserts.assert (ration.id != null);

        var key = [KEY, tripId, ration.id].join (".");
        storage.remove (key);
    };

    return {
        find: find,
        findAll: findAll,
        save: saveRation,
        remove: removeRation
    };
}]);
