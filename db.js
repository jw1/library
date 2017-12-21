var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'node_stuff',
    password: 'node_stuff',
    database: 'node_library'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;