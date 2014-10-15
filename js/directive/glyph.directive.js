angular.module('trips').directive ('glyph', function () {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			color: '@'
		},
		template: '<span class="glyphicon glyphicon-{{name}}" style="color: {{color}}"></span>'
	};
});
