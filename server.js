// Dependencies
// -----------------------------------------------------


var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');
var app = express();
var http = require("https");
var path = require('path');
var config = require('./config/config');
var googleCloud = require('./server/google-cloud');
var favicon = require('serve-favicon');




// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});


// Logging and Parsing
app.use(express.static(__dirname + '/public')); // sets the static files location to public
app.use('/bower_components', express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(morgan('dev')); // log with Morgan
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.text()); // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride());
app.use(favicon(__dirname + '/public/imagenes/favicon.ico'));


//googleCloud.getPrivateUrl('prueba-pp', 'a_14320192.jpeg', { action: 'read', expires: '2019-04-01' });

// Routes
// ------------------------------------------------------
require('./app/routes.js')(app);

// Listen
// -------------------------------------------------------
app.listen(process.env.PORT);
console.log('App listening on port ' + process.env.PORT);