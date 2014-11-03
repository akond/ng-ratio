BIN = bin
JS = js

RESOURCE.JS = $(JS)/javascript.resource
RESOURCE.CSS = css/css.resource

build: index.html css js

include etc/make/*.Makefile

resources = $(strip $(shell $(RESCOMP) $1))
commaseparated = $(subst $(SPACE),$(COMMA),$1)
fsroot = $(addprefix .,$(call resources,$1))

CSSS := $(call fsroot,css/css.resource)
JSS := $(call fsroot,$(JS)/javascript.resource)


js: $(JS)/products.js


$(JS)/products.js: etc/products/*.csv $(BIN)/compile-product-list.php
	$(PHP) $(BIN)/compile-product-list.php etc/products/*.csv > $@


index.html: $(RESOURCE.JS) $(RESOURCE.CSS) partials/application.html
	$(PREPROC) \
	-D TEMPLATES= \
	-D JAVASCRIPTS="$(call commaseparated,$(addprefix .,$(call resources,$(RESOURCE.JS))))" \
	-D STYLES="$(call commaseparated,$(addprefix .,$(call resources,$(RESOURCE.CSS))))" \
	etc/m4/foreach.m4 partials/application.html > $@


css: css/ng-ration.css css/angular-wizard.css


validate:
	jshint -c jshint.conf $(filter-out js/locale/angular-locale_ru-ru.js js/externs.js js/products.js, $(shell find js -name '*.js'))


.PHONY: product-id
product-id:
	for i in `seq 1 1000`; do echo -n ',,,,' >> etc/products/$(NAME).csv; uuidgen -1 >> etc/products/$(NAME).csv; done
