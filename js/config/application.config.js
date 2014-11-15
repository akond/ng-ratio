goog.provide('ration.app');
goog.require('ration.config.route');
goog.require('ration.config.storage');

goog.require('ration.service.storage');
goog.require('ration.service.confirm');

goog.require('ration.controller.trip');

goog.require('ration.repository.product');
goog.require('ration.repository.trip');

goog.require('ration.model.trip');
goog.require('ration.model.plan');
goog.require('ration.model.ration');


angular.module('ng-ration', ['ngRoute', 'ui.bootstrap', 'mgo-angular-wizard', 'ngDialog', 'trips']);
angular.module('ng-ration').config(RouteConfig)
	.factory('confirm', ConfirmService);

angular.module('trips', ['LocalStorageModule', 'ui.bootstrap']);
angular.module('trips')
	.factory('storage', LocalStorageService)
	.factory('rationRepository', RepositoryRation)
	.factory('productRepository', RepositoryProduct)
	.factory('tripRepository', RepositoryTrip)
	.controller('TripCtrl', TripController);
