const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

module.exports.createCategory = [
  body('name', 'Genre name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('form_category', {
        title: 'New Category',
        name: req.body.name,
        description: req.body.description,
        errors: errors.array(),
      });
    }

    // create a MongoDB document inside collection 'Category' with these fields
    const [name, description] = [req.body.name, req.body.description];
    const newCategoryDocument = new Category({
      name,
      description,
    });
    // save the document
    await newCategoryDocument.save();
    console.log('SAVED');
    res.redirect(newCategoryDocument.URL);
  }),
];
