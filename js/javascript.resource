/------------------------------------------------------------------------------/
/ Path definitions                                                             /
/------------------------------------------------------------------------------/
PATH(BOWER,/bower_components)
PATH(JS,/js)
PATH(CONTROLLER,JS/controller)
PATH(DIRECTIVE,JS/directive)
PATH(SERVICE,JS/service)
PATH(REPOSITORY,JS/repository)
PATH(MODEL,JS/model)
PATH(LOCALE,JS/locale)


/------------------------------------------------------------------------------/
/ Imported                                                                     /
/------------------------------------------------------------------------------/
INCLUDE(BOWER/jquery/dist/jquery.min.js)
INCLUDE(BOWER/closurelibrary/closure/goog/base.js)
INCLUDE(BOWER/angular/angular.js)
INCLUDE(LOCALE/angular-locale_ru-ru.js)

INCLUDE(BOWER/angular-route/angular-route.js)
//INCLUDE(BOWER/angular-bootstrap/ui-bootstrap.js)
INCLUDE(BOWER/angular-bootstrap/ui-bootstrap-tpls.js)

INCLUDE(BOWER/angular-local-storage/dist/angular-local-storage.js)
INCLUDE(BOWER/node-uuid/uuid.js)
INCLUDE(BOWER/ng-slider-menu/src/js/slide-menu.js)

-- https://github.com/mgonto/angular-wizard
INCLUDE(BOWER/angular-wizard/dist/angular-wizard.js)
INCLUDE(BOWER/angular-daterangepicker/js/angular-daterangepicker.js)

INCLUDE(BOWER/lodash/dist/lodash.min.js)


/------------------------------------------------------------------------------/
/ These are mine                                                               /
/------------------------------------------------------------------------------/
INCLUDE(JS/application.config.js)

-- Контроллеры
INCLUDE(CONTROLLER/trips.controller.js)
INCLUDE(CONTROLLER/product.controller.js)
INCLUDE(CONTROLLER/plan.controller.js)
INCLUDE(CONTROLLER/help.controller.js)
INCLUDE(CONTROLLER/test.controller.js)


-- Директивы
INCLUDE(DIRECTIVE/glyph.directive.js)
INCLUDE(DIRECTIVE/tag.directive.js)


-- Сервисы
INCLUDE(SERVICE/confirm.service.js)
INCLUDE(SERVICE/storage.service.js)


-- Модели
INCLUDE(MODEL/trip.model.js)
INCLUDE(MODEL/plan.model.js)
INCLUDE(MODEL/product.model.js)
INCLUDE(MODEL/ration.model.js)
INCLUDE(MODEL/day.model.js)
INCLUDE(MODEL/meal.model.js)
INCLUDE(MODEL/layout.model.js)


-- Репозитории
INCLUDE(REPOSITORY/trip.repository.js)
INCLUDE(REPOSITORY/product.repository.js)
INCLUDE(REPOSITORY/ration.repository.js)

INCLUDE(JS/standalone.js)

INCLUDE(JS/routes.config.js)
