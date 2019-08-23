const passport = require('passport');

exports.getSignup = async(req, res) => {
     res.render('auth/signup')    
    
}
exports.postSignup = passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });
exports.getProfile = async(req, res) => {
    res.send('This is your Profile')
}

exports.getLogin = async(req, res) => {
    res.render('auth/login')   
}
exports.postLogin =(req, res, next) => {
     passport.authenticate('local.login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
}