goog.provide('ration.model.day');

/**
 * @constructor
 */
function Day(time, meals) {
	/**
	 * @expose
	 */
	this.date = time;
	/**
	 * @expose
	 */
	this.meals = meals || [];
}

/**
 * @export
 * @param meal
 */
Day.prototype.addMeal = function (meal) {
	this.meals.push (meal);
};

/**
 * @export
 */
Day.prototype.calories = function (productIndex) {
	return goog.array.reduce (this.meals, function (sum, meal) {
		return sum + meal.calories (productIndex);
	}, 0);
};

/**
 * @export
 */
Day.prototype.weight = function () {
	return goog.array.reduce (this.meals, function (sum, meal) {
		return sum + meal.weight ();
	}, 0);
};
