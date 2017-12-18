var express = require('express');
var app = express();
var path = require('path');
var host = "0.0.0.0";
var port = "8082";

// view engine setup.
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

// get index.html.
app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server.
var server = app.listen(port, host, function ()
{
    console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), host, port);
});