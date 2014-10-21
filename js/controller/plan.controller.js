goog.require('goog.array');

angular.module('trips').controller('PlanCtrl', PlanController);
PlanController.$inject = ['$scope', '$route', 'tripRepository', 'productRepository', 'rationRepository', '$location', '$filter', 'resize', 'productFilter', 'ngDialog'];

function PlanController($scope, $route, tripRepository, productRepository, rationRepository, $location, $filter, resize, productFilter, ngDialog) {
	'use strict';

	var tripId = $route.current.params.id;
	var trip = $scope.Trip = tripRepository.find (tripId);
	var rations = rationRepository.findAllBucket (tripId);
	var products = $filter('orderBy')(productRepository.findAll (), 'title');

	var productIndex = $scope.productIndex = productRepository.getIndex ();

	$scope.scrollToDay = function(day){
		var speed = 400;
		$('#layout').animate({
			scrollTop: $('#layout').scrollTop () + $('#day-'+day).position().top
		}, speed);
		return false;
	};

	var resizeLayout = function (screenHeight) {
		$('#layout').css({
			height: screenHeight - $('#layout').offset ().top - 5 + 'px'
		});
		$('#products').css({
			height: screenHeight - $('#products').offset ().top - 5 + 'px'
		});
	};

	resizeLayout ($(window).height ());
	resize.register (function () {
		var size = resize.getSize ();
		if (goog.isDef (size)) {
			resizeLayout (size.height);
		}
	});

	$scope.$on("$destroy", function() {
		resize.unregister ();
	});

	$scope.basket = new Basket ();

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
	$scope.layout = layout;

	$scope.activateMeal = function (meal) {
		$scope.activeMeal = meal;
	};

	// восстанавливаем рационы для похода
	layout.visit (function (meal, dayIndex, mealIndex) {
		// По умолчанию активен завтрак первого дня
		if (dayIndex === 0 && mealIndex === 0) {
			$scope.activateMeal (meal);
		}

		// восстанавливаем список рационов из репозитория
		var mealRations = goog.object.getValueByKeys(rations, dayIndex, mealIndex) || [];
		goog.array.forEach (mealRations, function (ration) {
			meal.addRation (ration);
		});
	});

	$scope.editProducts = function () {
		$location.path("/product/");
	};

	$scope.removeRation = function ($event, ration) {
		if ($event.shiftKey) {
			$scope.basket.addRation (ration.clone ());
			return;
		}

		var meal = layout.findRationMeal(ration);
		if (meal) {
			meal.removeRation (ration);
		}

		rationRepository.remove (ration, trip.id);

		if ($event.ctrlKey) {
			$scope.basket.addRation (ration);
		}
	};

	$scope.addRationFromBasket = function (ration, event) {
		var result = $scope.addRation (ration.clone(), event, false);

		if (event.shiftKey) {
			return;
		}

		if (goog.isObject (result)) {
			result.then(function (result) {
				if (angular.isNumber(result.value)) {
					$scope.basket.removeRation (ration);
				}
			});
		}
	};

	var saveRation  = function (ration) {
		ration = $scope.activeMeal.addRation (ration);

		var index = layout.findMealIndex ($scope.activeMeal);
		rationRepository.save (ration, trip.id, index);
		return true;
	};

	$scope.addRation = function (ration, event, multiply) {
		multiply = multiply || true;

		if (multiply) {
			ration.amount = $scope.Trip.multiplyAmount (ration.amount);
		}

		var promise;

		if (event.ctrlKey) {
			promise = $scope.editRation (ration);
			promise.then (function (result) {
				if (!angular.isNumber(result.value)) {
					return;
				}

				return saveRation (ration);
			});

			return promise;
		}

		return saveRation (ration);
	};

	$scope.editRation = function (ration) {
		var dialog = ngDialog.open({
			template: 'partials/ration.html',
			controller: ['$scope', function ($scope) {
				$scope.amount = ration.amount;
				$scope.calorificValue = productIndex [ration.product].calorificValue;
				$scope.gramm = Math.round(ration.amount);
				$scope.cal = Math.round(ration.amount * $scope.calorificValue / 100);

				$scope.recalc = function (mode, value) {
					if ($scope.mode) {
						return;
					}
					$scope.mode = mode;
					$scope.amount = value;
					$scope.gramm = Math.round($scope.amount);
					$scope.cal = Math.round($scope.amount * $scope.calorificValue / 100);

					setTimeout(function () {
						$scope.mode = 0;
					}, 0)

					return;
				};

				$scope.keypress = function ($event) {
					if ($event.charCode === 13) {
						dialog.close (true);
					}
				};
			}]
		});

		dialog.closePromise.then (function (result) {
			if (angular.isNumber(result.value)) {
				ration.amount = result.value;
				var index = layout.findMealIndex ($scope.activeMeal);
				rationRepository.save (ration, trip.id, index);
			}
		});

		return dialog.closePromise;
	};
}
