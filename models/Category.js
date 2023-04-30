const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

CategorySchema.virtual('URL').get(function () {
  return `/category/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
