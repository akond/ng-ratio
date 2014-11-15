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

				$scope.message = message;

				$scope.ok = function (feedback) {
					$modalInstance.close();
				};

				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			}]
		});

		return dialog.result;
	};
};
