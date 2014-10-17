function Meal(title, rations) {
	this.title = title;
	this.rations = rations || [];
}

Meal.prototype.calories = function (productIndex) {
	return goog.array.reduce (this.rations, function (sum, ration) {
		return sum + productIndex [ration.product].calories (ration);
	}, 0);
};

Meal.prototype.removeRation = function (ration) {
	goog.array.remove (this.rations, ration);
};

Meal.prototype.addRation = function (ration) {
	var similarRation = this.findSimilarRation (ration);
	if (similarRation) {
		similarRation.amount += ration.amount;
		return similarRation;
	}
	goog.array.insert (this.rations, ration);
	return ration;
};

Meal.prototype.findSimilarRation = function (ration) {
	var similarRation;
	goog.array.forEach (this.rations, function (runningRation) {
		if (runningRation.product === ration.product) {
			similarRation = runningRation;
		}
	});
	return similarRation;
};
