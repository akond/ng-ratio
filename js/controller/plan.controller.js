goog.require('goog.array');

angular.module('trips').controller('PlanCtrl', PlanController);
PlanController.$inject = ['$scope', '$route', '$q', 'tripRepository', 'productRepository', 'rationRepository', 'basketRepository', '$location', '$filter', 'resize', 'productFilter', 'ngDialog', 'confirm'];

function PlanController($scope, $route, $q, tripRepository, productRepository, rationRepository, basketRepository, $location, $filter, resize, productFilter, ngDialog, confirm) {
	'use strict';

	var layoutElement = $('#ration-layout');
	var tripId = $route.current.params.id;
	var trip = $scope.Trip = tripRepository.find (tripId);
	var rations = rationRepository.findAllBucket (tripId);
	var products = $filter('orderBy')(productRepository.findAll (), 'title');

	var productIndex = $scope.productIndex = productRepository.getIndex ();

	var scrollToTheBottomIfNeeded = function () {
		var index = $scope.layout.findMealIndex ($scope.activeMeal);
		var isLastMeal = (index [0] === $scope.days.length - 1) && (index [1] === $scope.days [index [0]].meals.length - 1);
		if (!isLastMeal) {
			return;
		}

		layoutElement.animate({
			scrollTop: layoutElement.eq(0)[0].scrollHeight
		}, 400);
	};


	$scope.scrollToDay = function(day) {
		// сразу выбираем этот день
		var index = $scope.layout.findMealIndex ($scope.activeMeal);
		var activeDay = index [0];
		var activeMeal = index [1];
		if (day === activeDay) {
			// переходим на следующий приём пищи внутри одного дня
			activeMeal ++;
			if ($scope.days [day].meals.length <= activeMeal) {
				activeMeal = 0;
			}
			$scope.activateMeal ($scope.days [activeDay].meals [activeMeal]);
		} else {
			$scope.activateMeal ($scope.days [day].meals [0]);
		}

		layoutElement.animate({
			scrollTop: layoutElement.scrollTop () + $('#day-'+day).position().top
		}, 400);
		return false;
	};

	var resizeLayout = function (screenHeight) {
		layoutElement.css({
			height: screenHeight - layoutElement.offset ().top - 5 + 'px'
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
			if (!goog.isDef(productIndex [ration.product])) {
				// пропускаем продукты, которых не в индексе. удалены, например.
				return;
			}
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
		var basketRation = ration.clone ();
		$scope.basket.addRation (basketRation);
		basketRepository.add (basketRation);

		var dontDelete = $event.ctrlKey;
		if (dontDelete) {
			return;
		}

		var meal = layout.findRationMeal(ration);
		if (meal) {
			meal.removeRation (ration);
		}
		rationRepository.remove (ration, trip.id);
	};

	$scope.addWholeBasket = function ($event) {
		// Для нескольких продуктов очень трудно указать количества
		$event.ctrlKey = false;

		goog.array.forEach ($scope.basket.rations, function (ration) {
			$scope.addRationFromBasket (ration, $event);
		}, this);
	};

	$scope.addRationFromBasket = function (ration, event) {
		var dontRemove = goog.isDef (event) && event.shiftKey;
		$scope.addRation (ration.clone(), event, false).then(function () {
			if (dontRemove) {
				return;
			}

			$scope.basket.removeRation (ration);
			basketRepository.remove (ration);
		});
	};

	var saveRation = function (ration) {
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
		var isEditable = goog.isDef (event) && event.ctrlKey;
		if (isEditable) {
			var promise = $scope.editRation (ration);
			promise.then (function (result) {
				if (angular.isNumber(result.value)) {
					// рацион уже записан к этому моменту
					resultPromise.resolve ();
					scrollToTheBottomIfNeeded ();
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
		scrollToTheBottomIfNeeded ();

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
						dialog.close ($scope.amount);
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

	$scope.clearBasket = function () {
		confirm ('Удалить все продукты?').then(function () {
			$scope.basket.clear ();
			basketRepository.clear ();
		});
	};
}
