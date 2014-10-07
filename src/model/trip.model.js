function Trip(title) {
	this.title = title;
	this.id = uuid.v4();
}

Trip.createFrom = function (data) {
	var trip = new Trip(data);
	trip.id = data.id;
	trip.title = data.title;
	return  trip;
}

Trip.prototype.test = function () {
	console.log('test ' + this.id);
}

Trip.prototype.dateRange = function () {
	return this.id;
}
