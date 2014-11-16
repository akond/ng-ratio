RELEASE = release
APPLICATION = ng-ration
JS.IMPORTED = /bower% /js/locale/angular-locale_ru-ru.js
ALREADYINCLUDEDJS = /bower_components/closurelibrary/closure/goog/base.js
TESTJS = /js/controller/test.controller.js
EXTERNS = $(wildcard js/externs/*.js)
PARTIALS = $(filter-out $(PARTIALS.SPECIAL), $(wildcard partials/*))
PARTIALS.SPECIAL = $(addprefix partials/,scripts.html body.html test.html application.html)

releaseroot = $(subst $(SPACE),$3,$(addprefix $2,$(filter $(JS.IMPORTED), $(strip $(shell $(COMP) $1)))))

DEPS.DIR = bower_components/closurelibrary/closure/goog/ bower_components/closurelibrary/third_party/ js/
DEPS := $(shell $(GC.DEP) $(addprefix --root=,$(DEPS.DIR)) --namespace="ration.app")


release: info nodebug release-dynamic release-static

release-dynamic: $(RELEASE)/$(APPLICATION).html $(RELEASE)/$(APPLICATION).scripts $(RELEASE)/$(APPLICATION).js $(RELEASE)/index.html

release-static: $(RELEASE)/products.js $(RELEASE)/product-list.php fonts


.SILENT: info
info:
	echo
	echo Active js files are
	echo -------------------------------------------------
	echo $(DEPS) | fold -s
	echo -------------------------------------------------


nodebug:
	$(eval NODEBUG:=1)


$(RELEASE)/$(APPLICATION).html: partials/body.html
	cp $< $@


$(RELEASE)/index.html: $(RELEASE)/$(APPLICATION).scripts $(RELEASE)/$(APPLICATION).html
	echo '<html ng-app="ng-ration">' > $@
	cat $^ | sed s/\"ng-ration\\//\"/ >> $@

.DELETE_ON_ERROR: $(RELEASE)/$(APPLICATION).js
$(RELEASE)/$(APPLICATION).js: $(EXTERNS) $(DEPS)
ifeq ($(DEPS),)
	$(error Could not figure out what the required javascript files are.)
endif
	$(GC) \
	$(addprefix --js ,$(DEPS)) \
	$(addprefix --externs ,$(EXTERNS)) \
	  --generate_exports --angular_pass --compilation_level ADVANCED --formatting PRETTY_PRINT --closure_entry_point ration.app > $@
#	--jscomp_error checkTypes \


$(RELEASE)/combined.js: $(JSS)
	echo -n > $@
	for i in $(addprefix .,$(filter-out $(ALREADYINCLUDEDJS),$(filter $(JS.IMPORTED),$(call resources,$(RESOURCE.JS))))); do cat $$i >> $@; echo >> $@; done


$(RELEASE)/$(APPLICATION).css: $(CSSS) css
	cat $(CSSS) | $(CSSCOMP) $@


$(RELEASE)/$(APPLICATION).scripts: partials/scripts.html $(RELEASE)/combined.js $(RELEASE)/$(APPLICATION).css
	$(PREPROC) \
	-D JAVASCRIPTS="$(APPLICATION)/combined.js,$(APPLICATION)/$(APPLICATION).js" \
	-D STYLES="$(APPLICATION)/$(APPLICATION).css" \
	-D TEMPLATES="$(call commaseparated,$(PARTIALS))" \
	partials/scripts.html > $@


$(RELEASE)/products.js: $(JS)/products.js
	cp $< $@


$(RELEASE)/product-list.php: $(JS)/product-list.php
	cp $< $@

fonts: bower_components/bootstrap/fonts
	ln -s ./bower_components/bootstrap/fonts $@

clean::
	rm -rf $(RELEASE)/*
