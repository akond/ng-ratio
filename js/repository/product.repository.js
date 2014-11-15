goog.provide('ration.repository.product');
goog.require('ration.service.storage');
goog.require('goog.object');
goog.require('goog.asserts');

/**
 * @description Product repository
 * @param {!angular.$http} $http
 * @param {!ration.service.storage} storage
 * @constructor
 * @ngInject
 */
function RepositoryProduct ($http, storage) {
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

	var productFactory = function () {
		return new Product ();
	};

	var restore = function (key) {
		return storage.reconstitute (productFactory, key);
	};

	var addProduct = function (product) {
		goog.asserts.assert (!goog.string.isEmptyString(product.id));
		storage.set ([PRODUCT, product.id], product);
	};

	var removeProduct = function (product) {
		storage.remove ([PRODUCT, product.id]);
	};

	var sync = function () {
		return $http.jsonp('ng-ration/product-list.php?callback=JSON_CALLBACK', {
			cache: false
		}).success(function(data, status, headers, config) {
			if (goog.typeOf (data) === 'array') {
				var products = goog.array.map (data, function (item) {
					return goog.object.create ([
						'id', item [0],
						'title', item [1],
						'group', item [2],
						'calorificValue', item [3],
						'usualPortion', item [4],
						'keywords', item [5]
						]);
				});

				goog.object.forEach (storage.recreate (products, productFactory), function (product) {
					addProduct (product);
				});
			}
		});
	};

	var isEmpty = function () {
		var keys = storage.filterKeys(PRODUCT);
		return keys.length === 0;
	};

	return {
		isEmpty: isEmpty,
		find: find,
		findAll: findAll,
		getIndex: getIndex,
		add: addProduct,
		remove: removeProduct,
		sync: sync
	};
};
