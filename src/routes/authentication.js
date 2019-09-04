const router = require('express').Router();
const authenticationController = require('../controllers/authentication')
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');


router.get('/signup', isNotLoggedIn,authenticationController.getSignup); 
router.post('/signup', authenticationController.postSignup);
router.get('/profile', isLoggedIn, authenticationController.getProfile);
router.get('/login', isNotLoggedIn, authenticationController.getLogin);
router.post('/login', authenticationController.postLogin);
router.get('/logout', isLoggedIn, authenticationController.getLogout);
module.exports = router;