var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'Calculus, 8th Edition',
        genre: 'Educational',
        author: 'Stewart',
        read: false
    },
    {
        title: 'Discrete Mathematics, 5th Edition',
        genre: 'Educational',
        author: 'Ross & Wright',
        read: false
    },
    {
        title: 'Understanding Art',
        genre: 'Educational',
        author: 'Fichner-Rathus',
        read: true
    },
];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (request, response) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (error, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (error, results) {
                    response.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;
};

module.exports = router;