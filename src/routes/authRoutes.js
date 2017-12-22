var express = require('express');

var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function() {
    authRouter.route('/signUp')
        .post(function(request, response){
            console.log(request.body);
        });
    return authRouter;
};

module.exports = router;