function Trip(title) {
	this.id = uuid.v4();
	this.title = title;
	this.from = new Date ();
	this.to = null;
	this.plans = new Array();

}
