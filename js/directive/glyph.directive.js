goog.provide('ration.directive.glyph');

function GlyphDirective () {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			color: '@'
		},
		template: '<span class="glyphicon glyphicon-{{name}}" style="color: {{color}}"></span>'
	};
};
