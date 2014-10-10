LESS = lessc
COMP = $(M4) resource-list/resource-list.m4
M4 = $(firstword $(shell which gm4 m4)) -P
JS = js
EMPTY =
SPACE = $(EMPTY) $(EMPTY)
COMMA = ,

resources = $(subst $(SPACE),$(COMMA),$(strip $(shell $(COMP) $1)))


build: index.html css/angular-wizard.css


index.html: $(JS)/javascript.resource css/css.resource partials/application.html
	$(M4) $(if $(NODEBUG),,-D ALLOWDEBUG=1) -D JAVASCRIPTS="$(call resources,$<)" -D STYLES="$(call resources,css/css.resource)" etc/*.m4 partials/application.html > $@


css/angular-wizard.css: css/angular-wizard.less
	$(LESS) $< > $@


validate:
		jshint $(shell find js -name '*.js')
