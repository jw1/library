var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');


var nav = [
    {Link: '/Books', Text: 'Books'},
    {Link: '/Authors', Text: 'Authors'}
];


var bookRouter = require('./src/routes/bookRoutes')(nav);
app.use('/Books', bookRouter);

var adminRouter = require('./src/routes/adminRoutes')(nav);
app.use('/Admin', adminRouter);

var authRouter = require('./src/routes/authRoutes')(nav);
app.use('/Auth', authRouter);

app.get('/', function (request, response) {
    response.render(
        'index',
        {
            title: 'Hello from render',
            nav: [
                {Link: '/Books', Text: 'Books'},
                {Link: '/Authors', Text: 'Authors'}
            ]
        });
});

app.get('/books', function (request, response) {
    response.send('Hello Books');
});

app.listen(port, function (error) {
    console.log('running server on port ' + port);
});

