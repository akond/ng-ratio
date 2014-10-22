goog.require('goog.array');

function Basket() {
	this.rations = [];
}

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
