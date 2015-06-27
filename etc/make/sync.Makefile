RSYNC.HOST = ssh-80589-1@akond0fswat.de
RSYNC = rsync -v --copy-links --checksum --recursive --include-from=rsync.include --exclude-from=rsync.exclude -e ssh
RSYNC.TARGET = release/ $(RSYNC.HOST):akond0fswat-reinvent/public/ng-ration

define ASK =
read -p "Do you wish to install this program? [y/n]: " yn
if [ "y" == "$$yn" ]; then $1; fi
endef

.ONESHELL: sync
sync:
	$(RSYNC) --dry-run $(RSYNC.TARGET)
	$(call ASK,$(RSYNC) $(RSYNC.TARGET); ssh $(RSYNC.HOST) rm akond0fswat-reinvent/public/html/app-ration.html)
