/*jshint maxcomplexity:10*/
goog.provide('ration.model.product');

/**
 * @constructor
 */
function Product(id, title, group, calorificValue, usualPortion, keywords) {
	/**
	 * @expose
	 */
	this.id = id || uuid.v4();
	/**
	 * @expose
	 */
	this.title = title || '';
	/**
	 * @expose
	 */
	this.group = group || '';
	/**
	 * @expose
	 */
	this.calorificValue = calorificValue || null;
	/**
	 * @expose
	 */
	this.usualPortion = usualPortion || null;
	/**
	 * @expose
	 */
	this.keywords = keywords || '';
}

Product.prototype.calories = function (ration) {
	if (!goog.isDefAndNotNull (ration) && goog.isDefAndNotNull (this.usualPortion)) {
		ration = this.usualPortion;
	}

	if (goog.isObject (ration)) {
		ration = ration.amount;
	}

	goog.asserts.assertNumber (ration);

	return Math.round (this.calorificValue/100 * ration);
};

Product.prototype.createRation = function () {
	var ration = new Ration ();
	ration.product = this.id;
	ration.amount = this.usualPortion;
	return ration;
};
