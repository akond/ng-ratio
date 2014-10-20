goog.require('goog.array');

angular.module('trips').controller('PlanCtrl', PlanController);
PlanController.$inject = ['$scope', '$route', 'tripRepository', 'productRepository', 'rationRepository', '$location', '$filter', 'resize', 'productFilter', 'ngDialog'];

function PlanController($scope, $route, tripRepository, productRepository, rationRepository, $location, $filter, resize, productFilter, ngDialog) {
	'use strict';

	var tripId = $route.current.params.id;
	var trip = $scope.Trip = tripRepository.find (tripId);
	var rations = rationRepository.findAllBucket (tripId)
	var products = $filter('orderBy')(productRepository.findAll (), 'title');

	$scope.productIndex = productRepository.getIndex ();

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
		resizeLayout (resize.getSize ().height);
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
		})
	});

	$scope.editProducts = function () {
		$location.path("/product/");
	};

	$scope.removeRation = function ($event, ration) {
		var meal = layout.findRationMeal(ration);
		if (meal) {
			meal.removeRation (ration);
		}
		rationRepository.remove (ration, trip.id);

		if ($event.altKey || $event.ctrlKey) {
			$scope.basket.addRation (ration);
		}
	};

	$scope.addRationAndRemove = function (ration, event) {
		var result = $scope.addRation (ration, event);

		if (result === true) {
			$scope.basket.removeRation (ration);
			return;
		}

		if (goog.isObject (result)) {
			result.then(function (result) {
				if (result.value === true) {
					$scope.basket.removeRation (ration);
				}
			});
		}
	};

	$scope.addRation = function (ration, event) {
		var saveRation  = function () {
			ration = $scope.activeMeal.addRation (ration);

			var index = layout.findMealIndex ($scope.activeMeal);
			rationRepository.save (ration, trip.id, index);
			return true;
		};

		if (event.altKey) {
			var promise = $scope.editRation (ration, 1);
			promise.then (function (result) {
				if (result.value !== true) {
					return;
				}

				return saveRation (ration);
			});

			return promise;
		}

		if (event.ctrlKey) {
			var promise = $scope.editRation (ration, 2);
			promise.then (function (result) {
				if (result.value !== true) {
					return;
				}

				return saveRation (ration);
			});

			return promise;
		}


		return saveRation (ration);
	};

	$scope.editRation = function (ration, mode) {
		var editableRation = angular.copy(ration);
		if (mode === 2) {
			editableRation.amount = $scope.productIndex [ration.product].calorificValue * editableRation.amount / 100;
		}
		var dialog = ngDialog.open({
			template: 'partials/ration.html',
			controller: ['$scope', function ($scope) {
				$scope.Ration = editableRation;

				$scope.mode = mode;

				$scope.keypress = function ($event) {
					if ($event.charCode === 13) {
						dialog.close (true);
					}
				}
			}]
		});

		dialog.closePromise.then (function (result) {
			if (result.value === true) {
				if (mode === 1) {
					ration.amount = editableRation.amount;
				} else {
					ration.amount = editableRation.amount * 100 / $scope.productIndex [ration.product].calorificValue;
				}

				var index = layout.findMealIndex ($scope.activeMeal);
				rationRepository.save (ration, trip.id, index);
			}
		});

		return dialog.closePromise;
	}
}
