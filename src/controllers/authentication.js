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
    res.render('partials/profile')
}

exports.getLogin = async(req, res) => {
    res.render('auth/login')   
}

exports.postLogin = passport.authenticate('local.login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    });

exports.getLogout = async(req, res) => {
        req.logOut();
        res.redirect('/login')
}