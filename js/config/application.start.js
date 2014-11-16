goog.provide('ration.app.start');

angular.module('trips', ['LocalStorageModule', 'ui.bootstrap']);
angular.module('trips')
	.directive('tag', TagDirective)
	.directive('glyph', GlyphDirective)

	.factory('storage', LocalStorageService)
	.factory('resize', ResizeService)
	.factory('productFilter', ProductFilterService)

	.factory('rationRepository', RepositoryRation)
	.factory('productRepository', RepositoryProduct)
	.factory('tripRepository', RepositoryTrip)
	.factory('basketRepository', RepositoryBasket)

	.controller('TripCtrl', TripController)
	.controller('ReportCtrl', ReportController)
	.controller('ProductCtrl', ProductController)
	.controller('PlanCtrl', PlanController);

angular.module('ng-ration', ['ngRoute', 'ui.bootstrap', 'mgo-angular-wizard', 'ngDialog', 'trips']);
angular.module('ng-ration').config(RouteConfig)
	.factory('confirm', ConfirmService);
