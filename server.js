// server.js
// set up ========================

var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

// set up express
app.use(morgan('dev'));     // log every request to the console
app.use(cookieParser());    // read cookies (for authentication)
app.use(bodyParser());      // get information from html forms

app.set('view engine', 'ejs');   // set up ejs for templating

// passport set up
app.use(session({secret: 'thisiswuyu'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);


