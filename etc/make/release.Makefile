RELEASE = release
APPLICATION = ng-ration
EXTERNALJS = /bower% /js/locale/angular-locale_ru-ru.js
ALREADYINCLUDEDJS = /bower_components/closurelibrary/closure/goog/base.js
TESTJS = /js/controller/test.controller.js

PARTIALS = $(filter-out $(PARTIALS.SPECIAL), $(wildcard partials/*))
PARTIALS.SPECIAL = $(addprefix partials/,scripts.html body.html test.html application.html)

releaseroot = $(subst $(SPACE),$3,$(addprefix $2,$(filter $(EXTERNALJS), $(strip $(shell $(COMP) $1)))))


release: nodebug $(RELEASE)/$(APPLICATION).html $(RELEASE)/$(APPLICATION).scripts $(RELEASE)/$(APPLICATION).js


nodebug:
	$(eval NODEBUG:=1)


$(RELEASE)/$(APPLICATION).html: partials/body.html
	cp $< $@


.DELETE_ON_ERROR: $(RELEASE)/$(APPLICATION).js
$(RELEASE)/$(APPLICATION).js: compiled-js-config $(JSS)
	$(PLOVR) build compiled-js-config > $(RELEASE)/$(APPLICATION).js


.INTERMEDIATE: compiled-js-config
compiled-js-config: etc/m4/plovr.m4 $(RESOURCE.JS) $(JSS)
	$(M4) -D INPUTS="$(addprefix .,$(filter-out $(EXTERNALJS) $(TESTJS),$(call resources,$(RESOURCE.JS))))" etc/m4/join.m4 $< > $@
	$(call test_file_not_blank,$@)


$(RELEASE)/combined.js: $(JSS)
	echo -n > $@
	for i in $(addprefix .,$(filter-out $(ALREADYINCLUDEDJS),$(filter $(EXTERNALJS),$(call resources,$(RESOURCE.JS))))); do cat $$i >> $@; echo >> $@; done


$(RELEASE)/$(APPLICATION).css: $(CSSS) css
	cat $(CSSS) | $(CSSCOMP) $@


$(RELEASE)/$(APPLICATION).scripts: partials/scripts.html $(RELEASE)/combined.js $(RELEASE)/$(APPLICATION).js $(RELEASE)/$(APPLICATION).css
	$(PREPROC) \
	-D JAVASCRIPTS="$(APPLICATION)/combined.js,$(APPLICATION)/$(APPLICATION).js" \
	-D STYLES="$(APPLICATION)/$(APPLICATION).css" \
	-D TEMPLATES="$(call commaseparated,$(PARTIALS))" \
	partials/scripts.html > $@

