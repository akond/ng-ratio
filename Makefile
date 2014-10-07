COMP = $(M4) resource-list/resource-list.m4
M4 = m4 -P
JS = js
EMPTY =
SPACE = $(EMPTY) $(EMPTY)
COMMA = ,

resources = $(subst $(SPACE),$(COMMA),$(strip $(shell $(COMP) $1)))


build: index.html


index.html: $(JS)/javascript.resource css/css.resource application.html
	$(M4) -D JAVASCRIPTS="$(call resources,$<)" -D STYLES="$(call resources,css/css.resource)" etc/foreach.m4 application.html > $@
