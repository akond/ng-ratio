goog.require('goog.string');

angular.module('ng-ratio').config(['$provide', function ($provide) {
	$provide.factory('productFilter', ['$q', function ($q) {
		return function (search) {
			return function (product) {
				var noFilter = goog.string.isEmptyString(search.title);
				if (noFilter) {
					// если фильтра нет, то показываем все
					return true;
				}

				if (goog.string.caseInsensitiveContains(product.title, search.title)) {
					return true;
				}

				if (goog.string.caseInsensitiveContains(product.keywords, search.title)) {
					return true;
				}

				if (goog.string.caseInsensitiveContains(product.group, search.title)) {
					return true;
				}

				return false;
			};
		};
	}]);
}]);
