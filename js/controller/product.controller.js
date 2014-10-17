goog.require('goog.array');
goog.require('goog.functions');

angular.module('trips');
angular.module('trips').controller('ProductCtrl', ProductController);

ProductController['$inject'] = ['$scope', '$http', '$route', '$filter', 'productRepository', '$location', 'confirm', 'productFilter'];

function ProductController($scope, $http, $route, $filter, productRepository, $location, confirm, productFilter) {
	'use strict';

	$scope.products = goog.object.getValues (productRepository.findAll ());

	$scope.updateProductFilter = function () {
		$scope.filteredProducts = $filter('filter')($scope.products, productFilter ($scope.search || {title: ""}), false);
	};

	$scope.updateProductFilter ();

	$scope.noProducts = $scope['products'].length === 0;

	var model = $scope['Product'] = new Product();

	if (goog.isDef ($route.current.params.id)) {
		if (productRepository.find ($route.current.params.id)) {
			$scope['Product'] = productRepository.find ($route.current.params.id);
		} else {
			$scope['Product'].id = $route.current.params.id;
		}
	}

	$scope.edit = function (product) {
		$location.path("/product/" + product.id);
	};

	$scope.save = function (product) {
		goog.object.forEach (product, function (value, key) {
			goog.object.set (model, key, value);
		});

		productRepository.add (model);
		$location.path("/product/");
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
					goog.array.forEach (data, function (item) {
						var params = item;
						params.unshift (Product);

						$scope.save (goog.functions.create.apply (null, params));
					});
				}
			});
	};
}
