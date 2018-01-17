var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user); // callback
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    require('./strategies/local.strategy')();

    return passport;
};


