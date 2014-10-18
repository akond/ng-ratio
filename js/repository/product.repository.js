goog.require('goog.object');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('productRepository', ['storage', function (storage) {
	"use strict";

	var KEY = 'product';

	var find = function (id) {
		return restore (KEY + "." + id)[id];
	};

	var findAll = function () {
		return goog.object.getValues(restore (KEY));
	};

	var getIndex = function () {
		return goog.array.toObject (findAll (), function (product) {
			return product.id;
		});
	}

	var restore = function (key) {
		return storage.reconstitute (function () {
			return new Product ();
		}, key);
	};

	var addProduct = function (product) {
		goog.asserts.assert (product.id != null);
		storage.set (KEY + "." + product.id, product);
	};

	var removeProduct = function (product) {
		storage.remove (KEY + "." + product.id);
	};

	return {
		find: find,
		findAll: findAll,
		getIndex: getIndex,
		add: addProduct,
		remove: removeProduct
	};
}]);
