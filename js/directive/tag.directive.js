angular.module('trips').directive ('tag', function () {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			fixed: '=?'
		},
		transclude: true,
		template: '<span class="ration-tag ration-{{name}}" ng-transclude="yes"></span>',

		link: function (scope, element, attrs) {
			var titles = {
				weight: 'Масса',
				percent: 'От всего дня',
				sofar: 'Набрано',
				lack: 'Не хватает',
				ok: 'Цель достигнута',
				excess: 'Излишек',
				fail: 'Требуется',
				cal: 'Калорий'
			};

			element.attr ('title', titles [scope.name]);
			if (angular.isDefined(scope.fixed)) {
				element.addClass('clearfix');
			}

		}
	};
});
