goog.require('goog.array');
goog.require('goog.iter');
goog.require('goog.date.Date');
goog.require('goog.date.DateTime');
goog.require('goog.date.DateRange');
goog.require('goog.date.DateRange.Iterator');


angular.module('trips').controller('PlanCtrl', PlanController);

PlanController['$inject'] = ['$scope', '$route', 'tripRepository', 'productRepository', 'rationRepository', '$location', '$filter'];

function PlanController($scope, $route, tripRepository, productRepository, rationRepository, $location, $filter) {
	'use strict';

	var meals = ["Завтрак", "Обед", "Ужин"];
	var trip = $scope.Trip = tripRepository.find ($route.current.params.id);

	var products = $filter('orderBy')(productRepository.findAll (), 'title');

	//var dayCalorificPercentage =
	var days = function () {
		var start = goog.date.DateTime.fromRfc822String (trip.from);
		start = new goog.date.Date (start.getYear(), start.getMonth(), start.getDate ());
		var end = goog.date.DateTime.fromRfc822String (trip.to);
		end = new goog.date.Date (end.getYear(), end.getMonth(), end.getDate ());

		var daterange = new goog.date.DateRange(start, end);

		var rations = rationRepository.findAll (trip.id);

		return goog.array.map(goog.iter.toArray(daterange.iterator()), function (date, dayIndex) {
			var day = new Day (date.date);

			goog.array.forEach(meals, function (meal, mealIndex) {
				var mealRations = goog.object.getValueByKeys(trip.rations, dayIndex, mealIndex) || [];
				day.addMeal (new Meal (meal, mealRations));
			});

			return day;
		});
	};

	$scope.productIndex = goog.array.toObject (products, function (product) {
		return product.id;
	});

	$scope.products = products;

	$scope.updateProductFilter = function () {
		$scope.filteredProducts = $filter('filter')($scope.products, $scope.search, false);
		var total = $scope.filteredProducts.length;
		if (!$scope.displayFilteredOut) {
			$scope.filteredProducts = $filter('limitTo')($scope.filteredProducts, 20);
		}
		$scope.filteredOut = total - $scope.filteredProducts.length;
	};

	$scope.updateProductFilter ();

	$scope.productCount = goog.object.getCount ($scope.products);

	$scope.days = days();

	$scope.activate = function (meal) {
		$scope.active = meal;
	};

	$scope.active = $scope.days [0].meals [0];

	$scope.editProducts = function () {
		$location.path("/product/");
	};

	$scope.removeRation = function (ration, dayIndex, mealIndex) {
		goog.array.forEach ($scope.days, function (day) {
			goog.array.forEach (day.meals, function (meal) {
				meal.rations = goog.array.filter (meal.rations, function (item) {
					return item !== ration;
				});
			});
		});

		rationRepository.remove (ration, trip.id, dayIndex, mealIndex);
	};

	$scope.addRation = function (product) {
		var ration = new Ration ();
		ration.product = product.id;
		ration.amount = product.usualPortion;

		$scope.active.rations.push (ration);
		rationRepository.save (ration, trip.id, $scope.active.dayIndex, $scope.active.mealIndex);
	};
}
