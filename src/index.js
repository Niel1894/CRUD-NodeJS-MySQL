const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const mysqlstore = require('express-mysql-session')(session)
const {database} = require('./keys')
//initializations
const app = express();


//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret: 'mysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
})

//Controllers || Importing Routes
const index = require('./routes/index');
const links = require('./routes/links');
const authentication = require('./routes/authentication');
//Routes
app.use('/', index);
app.use('/links', links);
app.use('/authentication', authentication);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Starting  the Server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
    
})