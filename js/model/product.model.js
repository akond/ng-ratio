function Product(title, calorificValue) {
  this.id = uuid.v4();
  this.title = title || null;
  this.calorificValue = calorificValue || null;
}
