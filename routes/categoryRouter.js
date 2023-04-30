const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

// index page for /category
router.get('/', (req, res) => {
  res.send('You are now in /category');
});

// new category form page
router.get('/new', (req, res) => {
  res.render('form_category', { title: 'New Category' });
});

router.post('/new', categoryController.createCategory);

module.exports = router;
