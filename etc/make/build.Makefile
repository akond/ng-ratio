build: index.html css js



css: css/ng-ration.css css/angular-wizard.css


js: $(JS)/products.js $(JS)/deps.js


$(JS)/deps.js: js/config/application.config.js
	$(JS.DEP) -d bower_components/closurelibrary/closure/goog/ -p js/ -i js/config/application.config.js --output_mode=deps --output_file=$@


$(JS)/products.js: etc/products/*.csv $(BIN)/compile-product-list.php
	$(PHP) $(BIN)/compile-product-list.php etc/products/*.csv > $@


index.html: $(RESOURCE.JS) $(RESOURCE.CSS) partials/application.html
	$(PREPROC) \
	-D TEMPLATES= \
	-D JAVASCRIPTS="$(call commaseparated,$(addprefix .,$(filter $(JS.IMPORTED),$(call resources,$(RESOURCE.JS))) /$(JS)/deps.js /js/config/application.config.js /js/config/application.start.js))" \
	-D STYLES="$(call commaseparated,$(addprefix .,$(call resources,$(RESOURCE.CSS))))" \
	etc/m4/foreach.m4 partials/application.html > $@


clean::
	rm -rf css/ng-ration.css css/angular-wizard.css $(JS)/products.js $(JS)/deps.js index.html
