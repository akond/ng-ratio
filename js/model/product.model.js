function Product(id, title, calorificValue, usualPortion) {
	this.id = id || uuid.v4();
	this.title = title || null;
	this.calorificValue = calorificValue || null;
	this.usualPortion = usualPortion || null;
}

Product.prototype.calories = function (ration) {
	return Math.round(this.calorificValue/100 * ration.amount);
};

Product.prototype.createRation = function () {
	var ration = new Ration ();
	ration.product = this.id;
	ration.amount = this.usualPortion;
	return ration;
};
