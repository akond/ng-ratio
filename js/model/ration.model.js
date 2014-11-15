goog.provide('ration.model.ration');

/**
 * @constructor
 */
function Ration(amount) {
	/**
	 * @expose
	 */
	this.id = uuid.v4();

	/**
	 * @expose
	 */
	this.product = null;

	/**
	 * @expose
	 */
	this.amount = amount || 0;
}

Ration.prototype.clone = function () {
	var clone = angular.copy (this);
	clone.id = uuid.v4();

	return clone;
};
