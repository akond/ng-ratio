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
