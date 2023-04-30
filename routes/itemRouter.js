const router = require('express').Router();

// index page for /category
router.get('/', (req, res) => {
  res.send('You are now in /item');
});

module.exports = router;
