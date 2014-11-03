RELEASE = release
APPLICATION = ng-ration
EXTERNALJS = /bower% /js/locale/angular-locale_ru-ru.js
ALREADYINCLUDEDJS = /bower_components/closurelibrary/closure/goog/base.js
TESTJS = /js/controller/test.controller.js

releaseroot = $(subst $(SPACE),$3,$(addprefix $2,$(filter $(EXTERNALJS), $(strip $(shell $(COMP) $1)))))


release: nodebug $(RELEASE)/$(APPLICATION).html


nodebug:
	$(eval NODEBUG:=1)


$(RELEASE)/$(APPLICATION).html: partials/application.html $(RELEASE)/combined.js.gz $(RELEASE)/$(APPLICATION).js.gz $(RELEASE)/$(APPLICATION).css.gz
	$(PREPROC) \
	-D JAVASCRIPTS="$(RELEASE)/combined.js,$(APPLICATION).js" \
	-D STYLES="$(APPLICATION).css" \
	-D TEMPLATES="$(call commaseparated,$(filter-out partials/application.html,$(wildcard partials/*)))" \
	partials/application.html > $@


.DELETE_ON_ERROR: $(RELEASE)/$(APPLICATION).js
$(RELEASE)/$(APPLICATION).js: compiled-js-config js
	$(PLOVR) build compiled-js-config > $(RELEASE)/$(APPLICATION).js


.INTERMEDIATE: compiled-js-config
compiled-js-config: etc/m4/plovr.m4 $(RESOURCE.JS) $(JSS)
	$(M4) -D INPUTS="$(addprefix .,$(filter-out $(EXTERNALJS) $(TESTJS),$(call resources,$(RESOURCE.JS))))" etc/m4/join.m4 $< > $@
	$(call test_file_not_blank,$@)


$(RELEASE)/combined.js:
#	cat $(addprefix .,$(filter-out $(ALREADYINCLUDEDJS),$(filter $(EXTERNALJS),$(call resources,$(RESOURCE.JS))))) > $@
	echo -n > $@
	for i in $(addprefix .,$(filter-out $(ALREADYINCLUDEDJS),$(filter $(EXTERNALJS),$(call resources,$(RESOURCE.JS))))); do cat $$i >> $@; echo >> $@; done


$(RELEASE)/$(APPLICATION).css: $(CSSS) css
	cat $(CSSS) | $(CSSCOMP) $@
