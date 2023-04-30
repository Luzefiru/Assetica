const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('You are now in /item');
});

module.exports = router;
