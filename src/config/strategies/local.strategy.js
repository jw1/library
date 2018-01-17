var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy(
        {
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (error, db) {
                var collection = db.collection('users');
                collection.findOne({username: username}, function (error, results) {

                    // if match, then done else err
                    if (results.password === password) {
                        var user = results;
                        done(null, user);
                    } else {
                        done(null, false, {message: 'Bad Password'});
                    }
                });
            });
        })
    );
};