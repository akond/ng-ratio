goog.require('goog.object');
goog.require('goog.array');

function TripContainer(trips) {
	this.trips = {};
};

TripContainer.createFrom = function (data) {
	return new TripContainer().import(data);
};

TripContainer.prototype.add = function (trip) {
	this.trips[trip.id] = trip;
};

TripContainer.prototype.remove = function (trip) {
	delete this.trips[trip.id];
};

TripContainer.prototype.export = function () {
	return this.toArray();
};

TripContainer.prototype.import = function (trips) {
	goog.array.forEach(trips, $.proxy(function (data) {
		var trip = Trip.createFrom(data);
		this.trips [trip.id] = trip;
	}, this));

	return this;
};

TripContainer.prototype.toArray = function () {
	return goog.object.getValues(this.trips);
};
