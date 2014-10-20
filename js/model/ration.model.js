function Ration(amount) {
	this.id = uuid.v4();
	this.product = null;
	this.amount = amount || 0;
}

Ration.prototype.clone = function () {
	var clone = angular.copy (this);
	clone.id = uuid.v4();

	return clone;
};
