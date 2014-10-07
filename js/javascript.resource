PATH(BOWER,/bower_components)
PATH(JS,js)
PATH(CONTROLLER,JS/controller)
PATH(MODEL,JS/model)


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
INCLUDE(JS/application.config.js)

INCLUDE(CONTROLLER/help.controller.js)
INCLUDE(CONTROLLER/storage.controller.js)
INCLUDE(CONTROLLER/trips.controller.js)

INCLUDE(MODEL/trip.model.js)
INCLUDE(MODEL/trip-container.model.js)
