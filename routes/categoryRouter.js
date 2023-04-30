const router = require('express').Router();

// index page for /category
router.get('/', (req, res) => {
  res.send('You are now in /category');
});

// new category form page
router.get('/new', (req, res) => {
  res.render('form_category', { title: 'New Category' });
});

router.post('/new', (req, res) => {
  console.log(req.body);
});

module.exports = router;
