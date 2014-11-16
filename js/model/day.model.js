goog.provide('ration.model.day');

function Day(time, meals) {
	this.date = time;
	this.meals = meals || [];
}

Day.prototype.addMeal = function (meal) {
	this.meals.push (meal);
};

Day.prototype.calories = function (productIndex) {
	return goog.array.reduce (this.meals, function (sum, meal) {
		return sum + meal.calories (productIndex);
	}, 0);
};

Day.prototype.weight = function () {
	return goog.array.reduce (this.meals, function (sum, meal) {
		return sum + meal.weight ();
	}, 0);
};
