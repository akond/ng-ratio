function Product(title, calorificValue, usualPortion) {
	this.id = uuid.v4();
	this.title = title || null;
	this.calorificValue = calorificValue || null;
	this.usualPortion = usualPortion || null;
}

Product.prototype.calories = function (ration) {
	return Math.round(this.calorificValue/100 * ration.amount);
};
