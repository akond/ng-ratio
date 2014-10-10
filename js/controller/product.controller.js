goog.require('goog.array');

angular.module('trips');
angular.module('trips').controller('ProductCtrl', ProductController);

ProductController.$inject = ['$scope', '$route', 'productRepository', '$location', 'confirm'];

function ProductController($scope, $route, productRepository, $location, confirm) {
	'use strict';

	$scope.products = goog.object.getValues (productRepository.findAll ());

	$scope.noProducts = $scope.products.length === 0;

	$scope.Product = new Product();

	if (goog.isDef ($route.current.params.id)) {
		if (productRepository.find ($route.current.params.id)) {
			$scope.Product = productRepository.find ($route.current.params.id);
		}
	}

	$scope.edit = function (product) {
		$location.path("/product/" + product.id);
	};

	$scope.save = function (product) {
		productRepository.add (product);
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
		var products = [new Product ('Гречка', 4000), new Product ('Кошачье мясо', 4500)];
		goog.array.forEach(products, function (product) {
			this.save (product)
		}, this);
	};

	$scope.addTen = function () {
		goog.array.forEach (goog.array.range (7), angular.bind($scope, function () {
			var product = new Product ();
			product.title = Lorem.getSentence();
			product.calorificValue = parseInt (Math.random(100, 1000)*1000);

			productRepository.add (product);
			this.products.push(product);
		}));
	};
}
