/**
 * @fileoverview Externs for Bootstrap UI
 * @externs
 */

/**
 * @type {Object}
 * @const
 */
var $modal = {};

$modal.Promise = {};

$modal.Promise.dismiss = function () {};
$modal.Promise.close = function () {};

/**
 * @param {Object} config
 * @return {!$modal.Promise}
 */
$modal.open = function (config) {};
