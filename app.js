var express = require('express');

var app = express();

var port = process.env.PORT || 5000;


app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (request, response) {
    response.render('index', {list: ['a', 'b']});
});

app.get('/books', function (request, response) {
    response.send('Hello Books');
});

app.listen(port, function (error) {
    console.log('running server on port ' + port);
});

