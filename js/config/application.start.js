angular.module('ng-ration').config(RouteConfig)
	.factory('confirm', ConfirmService);

angular.module('trips', ['LocalStorageModule', 'ui.bootstrap']);
angular.module('trips')
	.directive('tag', TagDirective)

	.factory('storage', LocalStorageService)
	.factory('resize', ResizeService)
	.factory('productFilter', ProductFilterService)

	.factory('rationRepository', RepositoryRation)
	.factory('productRepository', RepositoryProduct)
	.factory('tripRepository', RepositoryTrip)
	.factory('basketRepository', RepositoryBasket)

	.controller('TripCtrl', TripController)
	.controller('PlanCtrl', PlanController);
