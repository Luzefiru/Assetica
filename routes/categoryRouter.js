const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('You are now in /category');
});

module.exports = router;
