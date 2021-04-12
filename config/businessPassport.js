const LocalStrategy = require('passport-local').Strategy;

// Load User model
const User = require('../models/businessUserModel');

module.exports = function(passport) {
    passport.use('businessLocal',
        new LocalStrategy({ usernameField: 'businessUserName' }, (userName, password, done) => {
            // Match user
            User.findOne({
                businessUserName: userName
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect User Name' });
                }
                if (password !== user.password) {
                    return done(null, false, { message: 'Incorrect Password' });
                }
                return done(null, user);
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};