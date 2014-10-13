BIN = bin

JAVA = java -jar
COMPRESS=gzip -k -f
CSSCOMP = $(JAVA) $(BIN)/yuicompressor-2.4.8.jar --type css -o
LESS = lessc -x
COMP = $(M4) resource-list/resource-list.m4
M4 = $(call firstavailable,gm4,m4) -P
JS = js
EMPTY =
SPACE = $(EMPTY) $(EMPTY)
COMMA = ,

firstavailable = $(firstword $(shell which $1 $2 $3 $4 $5 false))
resources = $(subst $(SPACE),$3,$(addprefix $2,$(strip $(shell $(COMP) $1))))
webroot = $(call resources,$1,,$(COMMA))
fsroot = $(call resources,$1,.,$(SPACE))

CSSS := $(call fsroot,css/css.resource)
JSS := $(call fsroot,$(JS)/javascript.resource)


%.css: %.less
	$(LESS) $< > $@

%.css.gz: %.css
	$(COMPRESS) $<


build: index.html css


index.html: $(JS)/javascript.resource css/css.resource partials/application.html
	$(M4) $(if $(NODEBUG),,-D ALLOWDEBUG=1) -D JAVASCRIPTS="$(call webroot,$<)" -D STYLES="$(call webroot,css/css.resource,)" etc/m4/*.m4 partials/application.html > $@


css: css/ng-ration.css css/angular-wizard.css


validate:
	jshint $(filter-out js/locale/angular-locale_ru-ru.js, $(shell find js -name '*.js'))


upload: build css/combined.css.gz


css/combined.css: $(CSSS)
	cat $(CSSS) | $(CSSCOMP) $@

.PHONY: etc/product-list.csv
etc/product-list.csv:
	for i in `seq 1 1000`; do echo -n ',,,,' >> $@; uuidgen >> $@; done
