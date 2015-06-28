/*jshint maxcomplexity:10*/
function Product(id, title, group, calorificValue, usualPortion, soldByPiece, keywords) {
	this.id = id || uuid.v4();
	this.title = title || '';
	this.group = group || '';
	this.calorificValue = calorificValue || null;
	this.usualPortion = usualPortion || null;
	this.soldByPiece = soldByPiece || false;
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
