var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');



//Authentication
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");

//authentication objects
const localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// Passport Config
require('./config/investorPassport')(passport);
require('./config/businessPassport')(passport);
require('./config/adminPassport')(passport);


var indexRouter = require('./routes/indexRoute');
var usersRouter = require('./routes/usersRoute');
var businessRouter = require('./routes/businessRoute');
var investorRouter = require('./routes/investorRoute');


var app = express();
const URI = "mongodb+srv://test:test@cluster0.nmnrj.mongodb.net/angelInvestorDatabase?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


// Express session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business', businessRouter);
app.use("/investor", investorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;