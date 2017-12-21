var express = require('express');
var bookRouter = express.Router();
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

var db = require('../../db')

var router = function (nav) {


    bookRouter.route('/')
        .get(function (request, response) {

            db.query('SELECT * FROM books;', function (error, result) {
                if (error) throw error;

                response.render('bookListView',
                    {
                        title: 'Books',
                        nav: nav,
                        books: result
                    });
            });
        });

    bookRouter.route('/:id')
        .all(function (request, response, next) {

            var id = request.params.id;

            db.query('SELECT * FROM books WHERE id = ? LIMIT 1;', id, function (error, result) {
                if (error) throw error;

                if (result.length < 1) {
                    response.status(404).send('Not Found');
                } else {
                    request.book = result[0];
                    next();
                }
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