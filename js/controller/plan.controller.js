goog.require('goog.array');

angular.module('trips').controller('PlanCtrl', PlanController);
PlanController.$inject = ['$scope', '$route', '$q', 'tripRepository', 'productRepository', 'rationRepository', 'basketRepository', '$location', '$filter', 'resize', 'productFilter', 'ngDialog'];

function PlanController($scope, $route, $q, tripRepository, productRepository, rationRepository, basketRepository, $location, $filter, resize, productFilter, ngDialog) {
	'use strict';

	var tripId = $route.current.params.id;
	var trip = $scope.Trip = tripRepository.find (tripId);
	var rations = rationRepository.findAllBucket (tripId);
	var products = $filter('orderBy')(productRepository.findAll (), 'title');

	var productIndex = $scope.productIndex = productRepository.getIndex ();

	$scope.scrollToDay = function(day){
		// сразу выбираем этот день
		$scope.activateMeal ($scope.days [day].meals [0]);
		$('#layout').animate({
			scrollTop: $('#layout').scrollTop () + $('#day-'+day).position().top
		}, 400);
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

	var basket = new Basket ();
	goog.object.forEach (basketRepository.findAll (), function (ration) {
		basket.addRation (ration);
	})
	$scope.basket = basket;

	$scope.products = products;

	$scope.updateProductFilter = function () {
		$scope.filteredProducts = $filter('filter')($scope.products, productFilter ($scope.search || {title: ""}), false);

		var total = $scope.filteredProducts.length;
		if (!$scope.displayFilteredOut) {
			$scope.filteredProducts = $filter('limitTo')($scope.filteredProducts, 25);
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

	$scope.removeRation = function (ration) {
		var meal = layout.findRationMeal(ration);
		if (meal) {
			meal.removeRation (ration);
		}

		rationRepository.remove (ration, trip.id);
	};

	$scope.moveRationToBasket = function ($event, ration) {
		$scope.basket.addRation (ration.clone ());

		var dontDelete = $event.ctrlKey;
		if (dontDelete) {
			return;
		}

		var meal = layout.findRationMeal(ration);
		if (meal) {
			meal.removeRation (ration);
		}
		rationRepository.remove (ration, trip.id);
		basketRepository.add (ration);
	};

	$scope.addRationFromBasket = function (ration, event) {
		var dontRemove = event.shiftKey;

		$scope.addRation (ration.clone(), event, false).then(function () {
			if (dontRemove) {
				return;
			}

			$scope.basket.removeRation (ration);
			basketRepository.remove (ration);
		});
	};

	var saveRation  = function (ration) {
		var adjustedRation = $scope.activeMeal.addRation (ration);

		var index = layout.findMealIndex ($scope.activeMeal);
		rationRepository.save (adjustedRation, trip.id, index);
	};

	$scope.addRation = function (ration, event, multiply) {
		var resultPromise = $q.defer();

		multiply = multiply || true;

		if (multiply) {
			ration.amount = $scope.Trip.multiplyAmount (ration.amount);
		}
		var isEditable = event.ctrlKey;
		if (isEditable) {
			var promise = $scope.editRation (ration);
			promise.then (function (result) {
				if (angular.isNumber(result.value)) {
					// рацион уже записан к этому моменту
					resultPromise.resolve ();
					return;
				}
				resultPromise.reject ();
			}, function () {
				resultPromise.reject ();
			});

			return resultPromise.promise;
		}

		saveRation (ration);
		resultPromise.resolve();

		return resultPromise.promise;
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
					}, 0);

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
				saveRation (ration);
			}
		});

		return dialog.closePromise;
	};
}
