{
	"id": "twig-javascript",
	"paths": ["vendor/jms/twig-js/src-js"],
	"mode": "ADVANCED",
	"level": "VERBOSE",
	"inputs": ["vendor/jms/twig-js/src-js/export.js", "INPUT"],
	"output-wrapper": "(function() {%output%})();\n",
	"pretty-print": true,
	"debug": false,
	"define": {
		"goog.DEBUG":false
	}
}
