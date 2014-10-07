PATH(BOWER,/bower_components)
PATH(JS,js)

/------------------------------------------------------------------------------/
/ Imported                                                                     /
/------------------------------------------------------------------------------/
INCLUDE(BOWER/jquery/dist/jquery.min.js)
INCLUDE(BOWER/closurelibrary/closure/goog/base.js)
INCLUDE(BOWER/angular/angular.js)
INCLUDE(BOWER/angular-route/angular-route.js)

INCLUDE(BOWER/angular-local-storage/dist/angular-local-storage.js)
INCLUDE(BOWER/node-uuid/uuid.js)
INCLUDE(BOWER/ng-slider-menu/src/js/slide-menu.js)

/------------------------------------------------------------------------------/
/ These are mine                                                               /
/------------------------------------------------------------------------------/
INCLUDE(JS/application.js)
INCLUDE(JS/application.router.js)

INCLUDE(JS/storage/storage.module.js)
INCLUDE(JS/storage/storage.controller.js)

INCLUDE(JS/help/help.controller.js)

INCLUDE(JS/model/trip.model.js)
INCLUDE(JS/model/trip-container.model.js)
