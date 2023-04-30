const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  price: { type: Number, required: true },
  in_stock: { type: Number, required: true, min: 0, default: 0 },
});

ItemSchema.virtual('URL').get(function () {
  return `/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
