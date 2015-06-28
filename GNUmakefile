BIN = bin
JS = js

resources = $(strip $(shell $(RESCOMP) $1))
commaseparated = $(subst $(SPACE),$(COMMA),$1)
fsroot = $(addprefix .,$(call resources,$1))

.DEFAULT_GOAL := release

RESOURCE.JS = $(JS)/javascript.resource
RESOURCE.CSS = css/css.resource

JSS = $(call fsroot,$(RESOURCE.JS))
CSSS = $(call fsroot,$(RESOURCE.CSS))


include etc/make/*.Makefile




index.html: $(RESOURCE.JS) $(RESOURCE.CSS) partials/application.html
	$(PREPROC) \
	-D TEMPLATES= \
	-D JAVASCRIPTS="$(call commaseparated,$(addprefix .,$(call resources,$(RESOURCE.JS))))" \
	-D STYLES="$(call commaseparated,$(addprefix .,$(call resources,$(RESOURCE.CSS))))" \
	etc/m4/foreach.m4 partials/application.html > $@


css: css/ng-ration.css css/angular-wizard.css



.PHONY: product-id
product-id:
	for i in `seq 1 1000`; do echo -n ',,,,' >> etc/products/$(NAME).csv; uuidgen >> etc/products/$(NAME).csv; done
