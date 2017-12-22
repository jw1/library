var express = require('express');
var bookRouter = express.Router();

var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function (nav) {

    bookRouter.route('/')
        .get(function (request, response) {

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (error, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function(error, result){
                    if (error) {
                        throw error;
                    }

                    response.render('bookListView',
                        {
                            title: 'Books',
                            nav: nav,
                            books: result
                        });
                });
            });
        });

    bookRouter.route('/:id')
        .all(function (request, response, next) {

            var id = new ObjectId(request.params.id);

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (error, db) {
                var collection = db.collection('books');

                collection.findOne({_id: id}, function (error, result) {
                    if (error) {
                        throw error;
                    }

                    if (result) {
                        request.book = result;
                        next();
                    } else {
                        response.status(404).send('Not Found');
                    }
                });
            });
        })
        .get(function (request, response) {
            response.render('bookView',
                {
                    title: 'Books',
                    nav: nav,
                    book: request.book
                });
        });

    return bookRouter;
};

module.exports = router;