COMP = $(M4) resource-list/resource-list.m4
M4 = m4 -P
JS = js
EMPTY =
SPACE = $(EMPTY) $(EMPTY)
COMA = ,

index.html: $(JS)/javascript.resource application.html
	$(M4) -D JAVASCRIPTS="$(subst $(SPACE),$(COMA),$(strip $(shell $(COMP) $<)))" etc/foreach.m4 application.html > $@


build:
	