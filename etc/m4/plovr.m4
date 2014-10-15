{
	"id": "twig-javascript",
	"paths": [],
	"mode": "SIMPLE",
	"level": "VERBOSE",
	"inputs": ["join(`", "', m4_translit(INPUTS,` ', `,'))"],
	"output-wrapper": "(function() {%output%})();\n",
	"pretty-print": false,
	"externs": ["//angular.js", "js/externs.js"],
	"debug": false,
	"define": {
		"goog.DEBUG":false
	}
}
