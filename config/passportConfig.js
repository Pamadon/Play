var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var User = require('../models/user');



passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id).then(function(user) {
        cb(null, user);
    }).catch(cb);
});

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, cb) {
    User.findOne({
        where: { email: email }
    }), (function(user) {
        if (!user || !user.isValidPassword(password)) {
            cb(null, false); //No user or bad password
        } else {
            cb(null, user); //User is allowed, yay
        }
    }).catch(cb);
}));


module.exports = passport;
