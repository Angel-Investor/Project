const LocalStrategy = require('passport-local').Strategy;

// Load User model
const User = require('../models/adminUserModel');

module.exports = function(passport) {
    passport.use('adminLocal',
        new LocalStrategy({ usernameField: 'adminUserName' }, (userName, password, done) => {
            // Match user
            User.findOne({
                adminUserName: userName
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