goog.provide('ration.controller.product');
goog.require('goog.array');
goog.require('goog.functions');

/**
 * @constructor
 * @ngInject
 */
function ProductController($scope, $http, $route, $filter, productRepository, tripRepository, $location, confirm, productFilter, ngDialog) {
	'use strict';

	var refreshProductList = function () {
		/**
		 * @expose
		 */
		$scope.products = productRepository.getIndex ();
		/**
		 * @expose
		 */
		$scope.productCount = goog.object.getCount ($scope.products);
		/**
		 * @expose
		 */
		$scope.updateProductFilter ();
	};

	/**
	 * @expose
	 */
	$scope.updateProductFilter = function () {
		/**
		 * @expose
		 */
		$scope.filteredProducts = $filter('filter')(goog.object.getValues ($scope.products), productFilter ($scope.search || {title: ""}), false);
	};

	refreshProductList();

	/**
	 * @expose
	 */
	$scope.noProducts = $scope.products.length === 0;

	/**
	 * @expose
	 */
	$scope.newProduct = function () {
			$scope.edit (new Product ());
	};

	/**
	 * @expose
	 */
	$scope.edit = function (product) {
		var editableProduct = angular.copy (product);
		var dialog = ngDialog.open({
			template: 'partials/product.html',
			controller: ['$scope', function ($scope) {
				$scope.Product = editableProduct;
			}]
		});

		dialog.closePromise.then (function (result) {
			if (result.value === true) {
				saveProduct (editableProduct);
				$scope.products [product.id] = editableProduct;
				$scope.updateProductFilter ();
			}
		});
	};

	var saveProduct = function (product) {
		var model = new Product ();
		goog.object.forEach (product, function (value, key) {
			goog.object.set (model, key, value);
		});

		productRepository.add (model);
	};

	/**
	 * @expose
	 */
	$scope.removeProduct = function (product) {
		confirm('Are you sure to remove this trip?').then (angular.bind($scope, function () {
			productRepository.remove (product);

			$scope.products = goog.object.filter ($scope.products, function (item, key) {
				return key !== product.id;
			});

			$scope.updateProductFilter();
		}));
	};

	/**
	 * @expose
	 */
	$scope.firstRun = function () {
		return productRepository.isEmpty() && tripRepository.isEmpty();
	};

	/**
	 * @expose
	 */
	$scope.sync = function (throwToTrips) {
		productRepository.sync ().success (function () {
			if (throwToTrips) {
				$location.path ("/new");
				return;
			}
			refreshProductList();
			$location.path("/product");
		});
	};

	if ($scope.firstRun()) {
		$scope.sync(true);
	}
}
