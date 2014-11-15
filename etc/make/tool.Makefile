PY = python
PHP = php
JAVA=java
JAVA_OPT=-Xmx128m -XX:+UseConcMarkSweepGC
JAR=$(JAVA) $(JAVA_OPT) -jar
PLOVR=$(JAR) bin/plovr-eba786b34df9.jar
COMPRESS=gzip -c -f
CSSCOMP = $(JAR) $(BIN)/yuicompressor-2.4.8.jar --type css -o
LESS = lessc -x
M4 = $(call firstavailable,gm4,m4) -P

PREPROC = $(M4) $(if $(NODEBUG),,-D ALLOWDEBUG=1) etc/m4/debug.m4 etc/m4/preproc.m4 etc/m4/foreach.m4
RESCOMP = $(M4) $(if $(NODEBUG),,-D ALLOWDEBUG=1) etc/m4/debug.m4 resource-list/resource-list.m4

GC = $(JAR) bin/compiler.jar
GC.DEP = $(PY) bower_components/closurelibrary/closure/bin/build/closurebuilder.py
