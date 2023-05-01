const Item = require('../models/Item');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

module.exports.createItem = asyncHandler([async (req, res, next) => {}]);

module.exports.readItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('category').exec();

  if (item === null) {
    const err = new Error('Item not found.');
    err.status = 404;
    return next(err);
  }

  res.render('detail_item', {
    title: item.name,
    name: item.name,
    description: item.description,
    category: item.category,
    price: item.price,
    in_stock: item.in_stock,
    URL: item.URL,
  });
});
