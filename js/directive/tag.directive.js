angular.module('trips').directive ('tag', function () {
	return {
		restrict: 'E',
		scope: {
			name: '@'
		},
		transclude: true,
		template: '<span class="ration-tag ration-{{name}}" ng-transclude="yes"></span>',

		link: function (scope, element, attrs) {
			var titles = {
				percent: 'От всего дня',
				sofar: 'Набрано',
				lack: 'Не хватает',
				ok: 'Цель достигнута',
				excess: 'Излишек',
				fail: 'Требуется'
			};

			element.attr ('title', titles [scope.name]);
		}
	};
});
