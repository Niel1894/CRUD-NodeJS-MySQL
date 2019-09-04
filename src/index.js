const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlstore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const {database} = require('./keys');
const passport = require('passport');
//initializations
const app = express();
require('./lib/passport');


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs');

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'mysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

//Controllers || Importing Routes
const index = require('./routes/index');
const links = require('./routes/links');
const authentication = require('./routes/authentication');
//Routes
app.use(index);
app.use('/links', links);
app.use(authentication);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Starting  the Server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
    
})