const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
//initializations
const app = express();
const morgan = require('morgan')

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
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) =>{
    next();
})

//Middlewares
app.use(morgan('dev'));

//Global Variables

//Controllers || Importing Routes
const index = require('./routes/index');
const links = require('./routes/links');
const authentication = require('./routes/authentication');
//Routes
app.use('/', index);
app.use('/links', links);
app.use('/authentication', authentication)

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Starting  the Server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
    
})