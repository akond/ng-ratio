goog.provide('ration.model.basket');
goog.require('goog.array');

function Basket() {
	this.rations = [];
}

Basket.prototype.calories = function (productIndex) {
	return goog.array.reduce (this.rations, function (sum, ration) {
		return sum + productIndex[ration.product].calories (ration);
	}, 0);
};

Basket.prototype.amount = function () {
	return goog.array.reduce (this.rations, function (sum, ration) {
		return sum + ration.amount;
	}, 0);
};

Basket.prototype.addRation = function (ration) {
	goog.array.insert (this.rations, ration);
};

Basket.prototype.removeRation = function (ration) {
	goog.array.remove (this.rations, ration);
};

Basket.prototype.isEmpty = function () {
	return this.getCount() === 0;
};

Basket.prototype.getCount = function () {
	return this.rations.length;
};

Basket.prototype.clear = function () {
	return goog.array.clear (this.rations);
};
