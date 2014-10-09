function Trip(title) {
	this.id = uuid.v4();
	this.title = title;
	this.from = null;
	this.to = null;
}

Trip.createFrom = function (data) {
	var trip = new Trip(data);
	trip.id = data.id;
	trip.title = data.title;
	return  trip;
}

Trip.prototype.test = function () {

}

Trip.prototype.dateRange = function () {
	return this.id;
}
