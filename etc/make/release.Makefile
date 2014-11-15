RELEASE = release
APPLICATION = ng-ration
EXTERNALJS = /bower% /js/locale/angular-locale_ru-ru.js
ALREADYINCLUDEDJS = /bower_components/closurelibrary/closure/goog/base.js
TESTJS = /js/controller/test.controller.js
EXTERNS = $(wildcard js/externs/*.js)
PARTIALS = $(filter-out $(PARTIALS.SPECIAL), $(wildcard partials/*))
PARTIALS.SPECIAL = $(addprefix partials/,scripts.html body.html test.html application.html)

releaseroot = $(subst $(SPACE),$3,$(addprefix $2,$(filter $(EXTERNALJS), $(strip $(shell $(COMP) $1)))))

DEPS := $(shell $(GC.DEP) --root=bower_components/closurelibrary/closure/goog --root=bower_components/closurelibrary/third_party/ --root=js/ --namespace="ration.app")

release: info nodebug $(RELEASE)/$(APPLICATION).html $(RELEASE)/$(APPLICATION).scripts $(RELEASE)/$(APPLICATION).js $(RELEASE)/index.html

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
	$(GC) --generate_exports --angular_pass $(addprefix --externs ,$(EXTERNS))  --compilation_level ADVANCED --formatting PRETTY_PRINT --closure_entry_point ration.app $(addprefix --js ,$(DEPS)) > $@


$(RELEASE)/combined.js: $(JSS)
	echo -n > $@
	for i in $(addprefix .,$(filter-out $(ALREADYINCLUDEDJS),$(filter $(EXTERNALJS),$(call resources,$(RESOURCE.JS))))); do cat $$i >> $@; echo >> $@; done


$(RELEASE)/$(APPLICATION).css: $(CSSS) css
	cat $(CSSS) | $(CSSCOMP) $@


$(RELEASE)/$(APPLICATION).scripts: partials/scripts.html $(RELEASE)/combined.js $(RELEASE)/$(APPLICATION).css
	$(PREPROC) \
	-D JAVASCRIPTS="$(APPLICATION)/combined.js,$(APPLICATION)/$(APPLICATION).js" \
	-D STYLES="$(APPLICATION)/$(APPLICATION).css" \
	-D TEMPLATES="$(call commaseparated,$(PARTIALS))" \
	partials/scripts.html > $@


qu:
	#$(GC) $(addprefix --js ,$(addprefix .,$(filter-out $(EXTERNALJS) $(TESTJS),$(call resources,$(RESOURCE.JS)))))

	$(GC) $(addprefix --js ,$(DEPS)) > 1
