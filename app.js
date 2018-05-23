var http = require('http');
var path = require('path');

var port = process.env.PORT || '3030';

var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var express = require('express');
var app = express();

// if localhost, pretty-print html output
app.locals.pretty = process.env.PORT ? false : true;
app.set('port', port);

//parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//static directory
app.use(express.static(path.join(__dirname, 'public')));

//load my resources
app.use('/', require('./routes'));

//listen
http.createServer(app).listen(port);
