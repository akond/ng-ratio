function Trip(title) {
	this.id = uuid.v4();
	this.title = title;
	this.from = new Date ();
	this.to = null;
	this.plans = [];
	this.rations = [];
}

Trip.prototype.menCount = function (title) {
	return this.plans.reduce (function (sum, plan) {
		return sum + parseInt(plan.men);
	}, 0);
};
