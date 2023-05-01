const Item = require('../models/Item');
const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

module.exports.getIndex = asyncHandler(async (req, res) => {
  const items = await Item.find().populate('category').exec();
  res.render('index_item', { title: 'All Items', items });
});

module.exports.getForm = asyncHandler(async (req, res) => {
  const availableCategories = await Category.find().exec();
  res.render('form_item', {
    title: 'New Item',
    availableCategories,
  });
});

module.exports.postForm = [
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
    } else if (req.body._id !== undefined) {
      // if there's an ID, that means we are updating an existing item
      // find a document via the URL's item :id, then update it
      const updatedItem = await Item.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price,
          in_stock: req.body.in_stock,
        }
      );
      // redirect to the updated item page
      res.redirect(updatedItem.URL);
    } else {
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
    }
  }),
];

module.exports.getDetail = asyncHandler(async (req, res, next) => {
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

exports.deleteItem = asyncHandler(async (req, res, next) => {
  const idToDelete = req.params.id;

  await Item.deleteOne({ _id: idToDelete }).exec();
  console.log('Successfully deleted Item:', idToDelete);
  res.redirect('/item');
});

exports.updateItem = asyncHandler(async (req, res, next) => {
  const availableCategories = await Category.find().exec();
  const idToUpdate = req.params.id;

  const item = await Item.findById(idToUpdate);
  res.render('form_item', {
    title: 'Edit Item',
    name: item.name,
    description: item.description,
    category: item.category,
    price: item.price,
    in_stock: item.in_stock,
    URL: item.URL,
    _id: item._id,
    availableCategories,
  });
});
