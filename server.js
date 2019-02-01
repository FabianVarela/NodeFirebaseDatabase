var express = require('express');
var app = express();

app.get('/', (req, res) => {
    console.log('Get Request');
    res.send('Get Request');
});

var server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening at http://%s:%s', host, port);
});