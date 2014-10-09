PATH(BOWER,/bower_components)
PATH(JS,js)
PATH(CONTROLLER,JS/controller)
PATH(SERVICE,JS/service)
PATH(REPOSITORY,JS/service)
PATH(MODEL,JS/model)


/------------------------------------------------------------------------------/
/ Imported                                                                     /
/------------------------------------------------------------------------------/
INCLUDE(BOWER/jquery/dist/jquery.min.js)
INCLUDE(BOWER/closurelibrary/closure/goog/base.js)
INCLUDE(BOWER/angular/angular.js)
INCLUDE(BOWER/angular-route/angular-route.js)
//INCLUDE(BOWER/angular-bootstrap/ui-bootstrap.js)
INCLUDE(BOWER/angular-bootstrap/ui-bootstrap-tpls.js)


INCLUDE(BOWER/angular-local-storage/dist/angular-local-storage.js)
INCLUDE(BOWER/node-uuid/uuid.js)
INCLUDE(BOWER/ng-slider-menu/src/js/slide-menu.js)

-- https://github.com/mgonto/angular-wizard
INCLUDE(BOWER/angular-wizard/dist/angular-wizard.js)

INCLUDE(BOWER/lodash/dist/lodash.min.js)
INCLUDE(BOWER/Lorem.js/lorem.js)


/------------------------------------------------------------------------------/
/ These are mine                                                               /
/------------------------------------------------------------------------------/
INCLUDE(JS/application.config.js)

-- Контроллеры
INCLUDE(CONTROLLER/trips.controller.js)
INCLUDE(CONTROLLER/help.controller.js)
//INCLUDE(CONTROLLER/test.controller.js)

-- Сервисы
INCLUDE(SERVICE/confirm.service.js)

-- Модели
INCLUDE(MODEL/trip.model.js)
INCLUDE(MODEL/plan.model.js)

-- Репозитории
INCLUDE(REPOSITORY/trip.repository.js)
