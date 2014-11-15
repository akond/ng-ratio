goog.provide('ration.config.storage');

/**
 * @description Local Storage service provider
 * @param {!angular.localStorageServiceProvider} localStorageServiceProvider
 * @constructor
 * @ngInject
 */
function LocalStorageConfig(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('demoPrefix');
};
