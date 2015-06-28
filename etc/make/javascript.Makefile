

js: $(JS)/products.js


$(JS)/products.js: etc/products/*.csv $(BIN)/compile-product-list.php
	$(PHP) $(BIN)/compile-product-list.php etc/products/*.csv > $@


validate:
	jshint -c jshint.conf $(filter-out js/locale/angular-locale_ru-ru.js js/externs.js js/products.js, $(shell find js -name '*.js'))
