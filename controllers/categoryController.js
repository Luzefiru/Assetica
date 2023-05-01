const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

module.exports.getIndex = asyncHandler(async (req, res) => {
  const categories = await Category.find().exec();
  console.log(categories);
  res.render('index_category', { title: 'All Categories', categories });
});

module.exports.postCategory = [
  // validate & sanitize the req.body.name
  body('name', 'Genre name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // validate & sanitize the req.body.description
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // if there are errors, re-render the form with the previous tags and the errors.array() for display
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('form_category', {
        title: 'New Category',
        name: req.body.name,
        description: req.body.description,
        errors: errors.array(),
      });
    } else if (req.body._id !== '') {
      // if there's an ID, that means we are updating an existing category
      // find a document via the URL's category :id, then update its name & description
      const updatedCategory = await Category.findByIdAndUpdate(
        { _id: req.body._id },
        { name: req.body.name, description: req.body.description }
      );
      // redirect to the updated category page
      res.redirect(updatedCategory.URL);
    } else {
      // otherwise, it's a new document
      // create a MongoDB document inside collection 'Category' with these fields
      const [name, description] = [req.body.name, req.body.description];
      const newCategoryDocument = new Category({
        name,
        description,
      });

      // save the document
      await newCategoryDocument.save();
      res.redirect(newCategoryDocument.URL);
    }
  }),
];

module.exports.getDetail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  // if the category with the associated URL :id is not found, throw an error
  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  // otherwise, render the associated view
  res.render('detail_category', {
    title: category.name,
    name: category.name,
    description: category.description,
    URL: category.URL,
  });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const idToDelete = req.params.id;

  await Category.deleteOne({ _id: idToDelete }).exec();
  console.log('Successfully deleted Category:', idToDelete);
  res.redirect('/category');
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const idToUpdate = req.params.id;

  const category = await Category.findById(idToUpdate);
  console.log(category);
  res.render('form_category', {
    title: 'Edit Category',
    name: category.name,
    description: category.description,
    _id: category._id,
  });
});
