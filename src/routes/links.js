const router = require('express').Router();
const linksController = require('../controllers/links')

router.get('/add', linksController.getaddLinks);
router.post('/add', linksController.postaddLinks);

module.exports = router;