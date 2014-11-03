goog.require('goog.dom.ViewportSizeMonitor');

angular.module('ng-ration').config(['$provide', function ($provide) {
	$provide.factory('resize', ['$q', function ($q) {
		var vsm;

		return {
			register: function (handler) {
				vsm = new goog.dom.ViewportSizeMonitor();
				goog.events.listen(vsm, goog.events.EventType.RESIZE, handler);
			},
			getSize: function () {
				if (goog.isDefAndNotNull (vsm)) {
					return vsm.getSize ();
				}
			},
			unregister: function () {
				vsm = null;
			}
		};
	}]);
}]);
