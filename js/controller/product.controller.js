goog.require('goog.array');
goog.require('goog.functions');

angular.module('trips');
angular.module('trips').controller('ProductCtrl', ProductController);

ProductController.$inject = ['$scope', '$http', '$route', '$filter', 'productRepository', '$location', 'confirm', 'productFilter', 'ngDialog'];

function ProductController($scope, $http, $route, $filter, productRepository, $location, confirm, productFilter, ngDialog) {
	'use strict';

	$scope.products = productRepository.getIndex ();
	$scope.productCount = goog.object.getCount ($scope.products);

	$scope.updateProductFilter = function () {
		$scope.filteredProducts = $filter('filter')(goog.object.getValues ($scope.products), productFilter ($scope.search || {title: ""}), false);
	};

	$scope.updateProductFilter ();

	$scope.noProducts = $scope['products'].length === 0;

	$scope.edit = function (product) {
		var editableProduct = productRepository.find (product.id);
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

	$scope.remove = function (product) {
		confirm('Are you sure to remove this trip?').then (angular.bind($scope, function () {
			productRepository.remove (product);
			this.products = goog.array.filter (this.products, function (item) {
				return item.id !== product.id;
			});
		}));
	};

	$scope.sync = function () {
		$http({
			url: '/js/products.js?' + Math.random(),
			cache: false
		}).success(function(data, status, headers, config) {
				if (goog.typeOf (data) === 'array') {
					goog.array.forEach (data, function (params) {
						params.unshift (Product);
						saveProduct (goog.functions.create.apply (null, params));
					});
					$location.path("/product/");
				}
			});
	};
}
