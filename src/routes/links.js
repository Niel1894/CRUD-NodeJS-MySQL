const router = require('express').Router();
const linksController = require('../controllers/links')

router.get('/add', linksController.getaddLinks);
router.post('/add', linksController.postaddLinks);
router.get('/',linksController.getLinks);
router.get('/delete/:id', linksController.deleteLinks);
router.get('/edit/:id', linksController.getLink);
router.post('/edit/:id', linksController.updateLink)

module.exports = router;