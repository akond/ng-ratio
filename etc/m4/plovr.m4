{
	"id": "twig-javascript",
	"paths": [],
	"mode": "WHITESPACE",
	"level": "VERBOSE",
	"inputs": ["join(`", "', m4_translit(INPUTS,` ', `,'))"],
	"output-wrapper": "(function() {%output%})();\n",
	"pretty-print": true,
	"closure-library": "bower_components/closurelibrary/closure/goog/",
	"externs": ["//angular.js", "//jquery-1.7.js", "js/externs.js"],
	"define": {
		"goog.DEBUG":false
	}
}
