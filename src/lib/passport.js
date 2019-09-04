const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');   

passport.use('local.login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
}, async (req, username, password, done) => {
    //console.log(req.body);
    const rows = await pool.query('SELECT * FROM user WHERE username = ?', [username]
    )
    if(rows.length > 0 ){
        const user =  rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        console.log(validPassword);
        
        if(validPassword) {
            return done(null, user, req.flash('success','Welcome ' + user.username));
        }else{
            return done(null, false, req.flash('message','Incorrect Password'))
        }
    }else{
        return done(null, false, req.flash('message','The username does not exists'))
    }
}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    let newUser = {
        username,
        fullname,
        password
        
    };
    console.log(req.body);

newUser.password = await helpers.encryptPassword(password);
//Saving in the database
const result = await pool.query('INSERT INTO user SET ?', newUser);    
console.log(result);
newUser.id = result.insertId;
return done(null, newUser);


}));

passport.serializeUser((user,done) => {
    done(null, user.id);    
});
passport.deserializeUser(async(id, done) => {
    try {
        const rows = await pool.query('SELECT * FROM user WHERE id = ?', id);
        done(null, rows[0]);   
    } catch (error) {
        console.log(error);
        
    }
})