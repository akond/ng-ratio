BIN = bin
JS = js

RESOURCE.JS = $(JS)/javascript.resource
RESOURCE.CSS = css/css.resource

default: build

include etc/make/*.Makefile

resources = $(strip $(shell $(RESCOMP) $1))
commaseparated = $(subst $(SPACE),$(COMMA),$1)
fsroot = $(addprefix .,$(call resources,$1))

CSSS := $(call fsroot,css/css.resource)
JSS := $(call fsroot,$(RESOURCE.JS))

validate:
	jshint -c jshint.conf $(filter-out js/locale/angular-locale_ru-ru.js js/externs.js js/products.js, $(shell find js -name '*.js'))


.PHONY: product-id
product-id:
	for i in `seq 1 1000`; do echo -n ',,,,' >> etc/products/$(NAME).csv; uuidgen >> etc/products/$(NAME).csv; done
