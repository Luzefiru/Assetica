const router = require('express').Router();
const itemController = require('../controllers/itemController');

// READ all items
router.get('/', itemController.getIndex);

// new item form page
router.get('/new', itemController.getItemForm);

// CREATE a single item
router.post('/new', itemController.createItem);

// READ a single item
router.get('/:id', itemController.readItem);

module.exports = router;
