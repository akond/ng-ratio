%.css: %.less
	$(LESS) $< > $@

%.css.gz: %.css
	$(COMPRESS) $< > $@

%.js.gz: %.js
	$(COMPRESS) $< > $@
