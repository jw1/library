var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

    var middleware = function (request, response, next) {
        if (!request.user) {
            response.redirect('/');
        } else {
            next();
        }
    };

    var getIndex = function (request, response) {

        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (error, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function (error, result) {
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
    };

    // this is unfinished
    var getById = function (request, response) {

        var id = new ObjectId(request.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function (error, db) {
            var collection = db.collection('books');

            collection.findOne({_id: id}, function (error, result) {

                if (error) {
                    throw error;
                }

                if (result) {

                    console.log('Here is the book:  ' + result.book);
                    console.log('Here is the book:  ' + result.bookId);
                    console.log('Here is the book:  ' + request.book);

                    if (result.bookId) {

                        bookService.getBookById(result.bookId, function (error, book) {

                            result.book = book;

                            response.render('bookView',
                                {
                                    title: 'Books',
                                    nav: nav,
                                    book: result.book
                                });
                            });

                    } else {
                        response.render('bookView',
                            {
                                title: 'Books',
                                nav: nav,
                                book: request.book
                            });

                    };

                } else {
                    response.status(404).send('Not Found');
                }
            });
        });
    };

    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    };
};


module.exports = bookController;