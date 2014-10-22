goog.require('goog.object');
goog.require('goog.asserts');

angular.module('ng-ratio').factory('productRepository', ['storage', function (storage) {
	"use strict";

	var PRODUCT = 'product';

	var find = function (id) {
		return restore ([PRODUCT, id]) [id];
	};

	var findAll = function () {
		return goog.object.getValues (restore (PRODUCT));
	};

	var getIndex = function () {
		return goog.array.toObject (findAll (), function (product) {
			return product.id;
		});
	};

	var restore = function (key) {
		return storage.reconstitute (function () {
			return new Product ();
		}, key);
	};

	var addProduct = function (product) {
		goog.asserts.assert (!goog.string.isEmptyString(product.id));
		storage.set ([PRODUCT, product.id], product);
	};

	var removeProduct = function (product) {
		storage.remove ([PRODUCT, product.id]);
	};

	return {
		find: find,
		findAll: findAll,
		getIndex: getIndex,
		add: addProduct,
		remove: removeProduct
	};
}]);
