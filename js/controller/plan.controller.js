goog.require('goog.array');

angular.module('trips').controller('PlanCtrl', PlanController);
PlanController['$inject'] = ['$scope', '$route', 'tripRepository', 'productRepository', 'rationRepository', '$location', '$filter', 'resize', 'productFilter'];

function PlanController($scope, $route, tripRepository, productRepository, rationRepository, $location, $filter, resize, productFilter) {
	'use strict';

	var trip = $scope.Trip = tripRepository.find ($route.current.params.id);
	var products = $filter('orderBy')(productRepository.findAll (), 'title');

	$scope.productIndex = goog.array.toObject (products, function (product) {
		return product.id;
	});

	var resizeLayout = function (height) {
		var layout = $('#layout');

		var newHeight = height - layout.offset ().top - 5;
		layout.add('#products').css({
			height: newHeight + 'px',
		});
	};

	resizeLayout ($(window).height ());
	resize.register (function () {
		resizeLayout (resize.getSize ().height);
	});

	$scope.$on("$destroy", function() {
        resize.unregister ();
    });

	$scope.products = products;

	$scope.updateProductFilter = function () {
		$scope.filteredProducts = $filter('filter')($scope.products, productFilter ($scope.search || {title: ""}), false);

		var total = $scope.filteredProducts.length;
		if (!$scope.displayFilteredOut) {
			$scope.filteredProducts = $filter('limitTo')($scope.filteredProducts, 20);
		}
		$scope.filteredOut = total - $scope.filteredProducts.length;
	};

	$scope.updateProductFilter ();
	$scope.productCount = goog.object.getCount ($scope.products);

	var layout = new Layout (trip.from, trip.to);

	$scope.days = layout.days;

	$scope.activateMeal = function (meal) {
		$scope.activeMeal = meal;
	};

	layout.visit (function (meal, dayIndex, mealIndex) {
		// По умолчанию активен завтрак первого дня
		if (dayIndex === 0 && mealIndex === 0) {
			$scope.activateMeal (meal);
		}

		// восстанавливаем список рационов из репозитория
		var rations = goog.object.getValueByKeys(trip.rations, dayIndex, mealIndex) || [];
		goog.array.forEach (rations, function (ration) {
			meal.addRation (ration);
		})
	});

	$scope.editProducts = function () {
		$location.path("/product/");
	};

	$scope.removeRation = function (ration) {
		$scope.activeMeal.removeRation (ration);
		rationRepository.remove (ration, trip.id);
	};

	$scope.addRation = function (ration) {
		ration = $scope.activeMeal.addRation (ration);

		var index = layout.findMealIndex ($scope.activeMeal);
		rationRepository.save (ration, trip.id, index);
	};
}
