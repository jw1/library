var express = require('express');
var passport = require('passport');

var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function () {
    authRouter.route('/signUp')
        .post(function (request, response) {

            console.log(request.body);

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (error, db) {

                var collection = db.collection('users');

                var user = {
                    username: request.body.userName,
                    password: request.body.password
                };

                collection.insertOne(user, function (error, results) {

                    request.logIn(results.ops[0], function () {
                        response.redirect('/auth/profile');
                    });

                });
            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (request, response) {
            response.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(function(request, response, next) {
            if (! request.user) {
                response.redirect('/');
            } else {
                next();
            }
        })
        .get(function (request, response) {
            response.json(request.user);
        });

    return authRouter;
};

module.exports = router;