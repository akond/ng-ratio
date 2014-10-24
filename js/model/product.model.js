function Product(id, title, group, calorificValue, usualPortion, keywords) {
	this.id = id || uuid.v4();
	this.title = title || '';
	this.group = group || '';
	this.calorificValue = calorificValue || null;
	this.usualPortion = usualPortion || null;
	this.keywords = keywords || '';
}

Product.prototype.calories = function (ration) {
	return Math.round (this.calorificValue/100 * ration.amount);
};

Product.prototype.createRation = function () {
	var ration = new Ration ();
	ration.product = this.id;
	ration.amount = this.usualPortion;
	return ration;
};
