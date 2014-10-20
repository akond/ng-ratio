goog.require('goog.date.Date');
goog.require('goog.date.DateTime');
goog.require('goog.date.DateRange');
goog.require('goog.date.DateRange.Iterator');
goog.require('goog.iter');

function Layout(from, to) {
	var meals = ["Завтрак", "Обед", "Ужин"];

	var start = goog.date.DateTime.fromRfc822String (from);
	start = new goog.date.Date (start.getYear(), start.getMonth(), start.getDate ());

	var end = goog.date.DateTime.fromRfc822String (to);
	end = new goog.date.Date (end.getYear(), end.getMonth(), end.getDate ());

	var daterange = new goog.date.DateRange(start, end);

	this.days = goog.array.map(goog.iter.toArray(daterange.iterator()), function (time) {
		return new Day (time.date, goog.array.map(meals, function (meal) {
			return new Meal (meal);
		}));
	});
};

Layout.prototype.addDay = function (day) {
	this.days.push (day);
};

Layout.prototype.findRationMeal = function (ration) {
	var result;
	this.visit (function (meal, dayIndex, mealIndex) {
		if (meal.containsRation (ration)) {
			result = meal;
		}
	});
	return result;
};

Layout.prototype.findMealIndex = function (meal) {
	var result = [];
	this.visit (function (a, dayIndex, mealIndex) {
		if (meal === a) {
			result = [dayIndex, mealIndex];
		}
	});

	return result;
};

Layout.prototype.weight = function () {
	var weight = 0;
	this.visit (function (meal) {
		weight += meal.weight ();
	})
	return weight;
};

Layout.prototype.visit = function (visitor) {
	goog.array.forEach(this.days, function (day, dayIndex) {
		goog.array.forEach (day.meals, function (meal, mealIndex) {
			visitor (meal, dayIndex, mealIndex);
		});
	});
};
