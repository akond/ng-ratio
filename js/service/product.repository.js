goog.require('goog.object');
goog.require('goog.asserts');

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

  var save = function (container) {
    storage.set (KEY, container);
  };

  var addProduct = function (product) {
    goog.asserts.assert (product.id != '');

    var products = restore ();
    products [product.id] = product;
    save (products);
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
