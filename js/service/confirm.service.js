goog.provide('ration.service.confirm');

/**
 * @description Confirm service
 * @param {!angular.$q} $q
 * @param {!angular.$modal} $modal
 * @constructor
 * @ngInject
 */
function ConfirmService($q, $modal) {
	return function (message) {
		var dialog = $modal.open({
			'templateUrl': 'partials/confirm.html',
			'controller': ['$scope', '$modalInstance', function ($scope, $modalInstance) {

				/**
				 * @expose
				 */
				$scope.message = message;

				/**
				 * @expose
				 */
				$scope.ok = function (feedback) {
					$modalInstance.close();
				};

				/**
				 * @expose
				 */
				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			}]
		});

		return dialog.result;
	};
};
