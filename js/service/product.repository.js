angular.module('ng-ratio').factory('productRepository', ['storage', function (storage) {
  "use strict";
  var KEY = 'products';

  var find = function (id) {
    return restore ()[id];
  };

  var findAll = function () {
    return goog.object.getValues(restore ());
  };

  var restore = function () {
    return storage.reconstitute (function () {
      return new Product ();
    }, KEY);
  };

  var addProduct = function (product) {
    var products = restore ();
    products [product.id] = product;
    save (products);
  };

  var save = function (container) {
    storage.set (KEY, container);
  };

  var removeProduct = function (product) {
    var products = restore ();
    delete products [product.id];
    save (products);
  };

  return {
    find: find,
    findAll: findAll,
    add: addProduct,
    remove: removeProduct
  };
}]);
