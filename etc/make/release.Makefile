RELEASE = release
APPLICATION = ng-ratio
EXTERNALJS = /bower% /js/locale/angular-locale_ru-ru.js
TESTJS = /js/controller/test.controller.js

releaseroot = $(subst $(SPACE),$3,$(addprefix $2,$(filter $(EXTERNALJS), $(strip $(shell $(COMP) $1)))))


release: $(RELEASE)/$(APPLICATION).html $(RELEASE)/$(APPLICATION).css.gz $(RELEASE)/$(APPLICATION).js.gz

.DELETE_ON_ERROR: $(RELEASE)/$(APPLICATION).js
$(RELEASE)/$(APPLICATION).js: compiled-js-config js
	$(PLOVR) build compiled-js-config > $(RELEASE)/$(APPLICATION).js


.INTERMEDIATE: compiled-js-config
compiled-js-config: etc/m4/plovr.m4 $(RESOURCE.JS) $(JSS)
	$(M4) -D INPUTS="$(addprefix .,$(filter-out $(EXTERNALJS) $(TESTJS),$(call resources,$(RESOURCE.JS))))" etc/m4/join.m4 $< > $@
	$(call test_file_not_blank,$@)


$(RELEASE)/$(APPLICATION).css: $(CSSS) css
	cat $(CSSS) | $(CSSCOMP) $@


$(RELEASE)/$(APPLICATION).html: partials/application.html
	$(PREPROC) \
	-D JAVASCRIPTS="$(call commaseparated,$(filter $(EXTERNALJS),$(call resources,$(RESOURCE.JS)))),$(APPLICATION).js" \
	-D STYLES="$(APPLICATION).css" \
	-D TEMPLATES="$(call commaseparated,$(filter-out partials/application.html,$(wildcard partials/*)))" \
	partials/application.html > $@
