function Trip(title) {
	this.id = uuid.v4();
	this.title = title;
	this.from = new Date ();
	this.to = null;

	/**
	 * a container of Plan objects
	 * @public {!Array.<Plan>}
	 */
	this.plans = [];

	/**
	 * each member of the array represents a day
	 * @public {!Array}
	 */
	this.rations = [];
}

Trip.prototype.menCount = function (title) {
	return this.plans.reduce (function (sum, plan) {
		return sum + parseInt(plan.men);
	}, 0);
};

Trip.prototype.calorificTarget = function () {
	return this.plans.reduce (function (sum, plan) {
		return sum + parseInt(plan.men) * parseInt (plan.calories);
	}, 0);
};

// Trip.prototype.calories = function () {
// 	return this.rations.reduce (function (sum, ration) {
// 		return sum + parseInt(plan.men) * ration.amount;
// 	}, 0);
// };
