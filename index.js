require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var passport = require('./config/passportConfig');

//Set and Use Statements
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(morgan('dev'));


//passport requirements

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playGame');





app.get('/', function(req, res) {
    res.render('home');
});

app.get('/profile', function(req, res) {
    res.render('profile', {
        user: req.user
    });
});

app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupmessage') });
});



app.post('/signup', function(req, res, next) {
    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    console.log(newUser);
    newUser.save(function(err) {
        if (err) return console.log(err);
    });
    newUser.save(function(err) {
        if (err) return console.log(err);
    }).then(function(user) {
        res.redirect('/profile');
    }).catch(function(err) {
        res.redirect('login');
    });

});


app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
});

app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginmessage') });
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {


    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}






app.listen(3000);
