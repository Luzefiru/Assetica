const router = require('express').Router();
const itemController = require('../controllers/itemController');

// READ all items
router.get('/', itemController.getIndex);

// new item form page
router.get('/new', itemController.getForm);

// CREATE a single item
router.post('/new', itemController.postForm);

// READ a single item
router.get('/:id', itemController.getDetail);

// UPDATE a single item
router.get('/:id/update', itemController.updateItem);

// DELETE a single item
router.post('/:id/delete', itemController.deleteItem);

module.exports = router;
