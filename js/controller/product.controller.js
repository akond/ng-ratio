goog.require('goog.array');
goog.require('goog.functions');

angular.module('trips').controller('ProductCtrl', ProductController);

ProductController.$inject = ['$scope', '$http', '$route', '$filter', 'productRepository', 'tripRepository', '$location', 'confirm', 'productFilter', 'ngDialog'];

function ProductController($scope, $http, $route, $filter, productRepository, tripRepository, $location, confirm, productFilter, ngDialog) {
	'use strict';

	var refreshProductList = function () {
		$scope.products = productRepository.getIndex ();
		$scope.productCount = goog.object.getCount ($scope.products);
		$scope.updateProductFilter ();
	};

	$scope.updateProductFilter = function () {
		$scope.filteredProducts = $filter('filter')(goog.object.getValues ($scope.products), productFilter ($scope.search || {title: ""}), false);
	};

	refreshProductList();

	$scope.noProducts = $scope.products.length === 0;

	$scope.newProduct = function () {
			$scope.edit (new Product ());
	};

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

	$scope.removeProduct = function (product) {
		confirm('Are you sure to remove this trip?').then (angular.bind($scope, function () {
			productRepository.remove (product);

			$scope.products = goog.object.filter ($scope.products, function (item, key) {
				return key !== product.id;
			});

			$scope.updateProductFilter();
		}));
	};

	$scope.firstRun = function () {
		return productRepository.isEmpty() && tripRepository.isEmpty();
	};

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
