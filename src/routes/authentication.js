const router = require('express').Router();
const authenticationController = require('../controllers/authentication')


router.get('/signup', authenticationController.getSignup); 
router.post('/signup', authenticationController.postSignup);
router.get('/profile', authenticationController.getProfile);
router.get('/login', authenticationController.getLogin);
router.post('/login', authenticationController.postLogin)

module.exports = router;