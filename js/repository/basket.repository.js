goog.require('goog.object');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('basketRepository', ['storage', function (storage) {
	"use strict";

	var BASKET = 'basket';

	var find = function (id) {
		return restore ([BASKET, id]) [id];
	};

	var findAll = function () {
		return goog.object.getValues (restore (BASKET));
	};

	var getIndex = function () {
		return goog.array.toObject (findAll (), function (product) {
			return product.id;
		});
	};

	var restore = function (key) {
		return storage.reconstitute (function () {
			return new Ration ();
		}, key);
	};

	var addRation = function (product) {
		goog.asserts.assert (!goog.string.isEmptyString(product.id));
		storage.set ([BASKET, product.id], product);
	};

	var removeRation = function (product) {
		storage.remove ([BASKET, product.id]);
	};

	return {
		find: find,
		findAll: findAll,
		getIndex: getIndex,
		add: addRation,
		remove: removeRation
	};
}]);
