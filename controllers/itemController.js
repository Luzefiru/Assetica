const Item = require('../models/Item');
const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

module.exports.getItemForm = asyncHandler(async (req, res) => {
  const availableCategories = await Category.find().exec();
  res.render('form_item', {
    title: 'New Item',
    availableCategories,
  });
});

module.exports.createItem = [
  body('name', 'Item name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category', 'Category must be selected.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Price must be above 0.').trim().isFloat({ min: 0 }).escape(),
  body('in_stock', 'Quantity must be above 0.')
    .trim()
    .isInt({ min: 0 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const availableCategories = await Category.find().exec();
      res.render('form_item', {
        title: 'New Item',
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        in_stock: req.body.in_stock,
        errors: errors.array(),
        availableCategories,
      });
    }

    const [name, description, category, price, in_stock] = [
      req.body.name,
      req.body.description,
      req.body.category,
      req.body.price,
      req.body.in_stock,
    ];
    const newItem = new Item({
      name,
      description,
      category: [category],
      price,
      in_stock,
    });
    await newItem.save();
    res.redirect(newItem.URL);
  }),
];

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
