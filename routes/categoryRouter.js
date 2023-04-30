const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

// index page for /category
router.get('/', (req, res) => {
  res.send('You are now in /category');
});

// page for a specific category :id
router.get('/:id', categoryController.readCategory);

// new category form page
router.get('/new', (req, res) => {
  res.render('form_category', { title: 'New Category' });
});

router.post('/new', categoryController.createCategory);

module.exports = router;
