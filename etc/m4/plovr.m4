{
	"id": "twig-javascript",
	"paths": [],
	"mode": "SIMPLE",
	"level": "VERBOSE",
	"inputs": ["join(`", "', m4_translit(INPUTS,` ', `,'))"],
	"output-wrapper": "(function() {%output%})();\n",
	"pretty-print": false,
	"closure-library": "bower_components/closurelibrary/closure/goog/",
	"externs": ["//webkit_console.js", "//angular.js", "//jquery-1.7.js", "js/externs.js"],
	"define": {
		"goog.DEBUG":false
	}
}
