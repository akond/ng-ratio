function Ration(amount) {
	this.id = uuid.v4();
	this.product = null;
	this.amount = amount || 0;
}
