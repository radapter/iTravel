'use strict';

//mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://itravel:itravel1@ds061681.mongolab.com:61681/heroku_app35953932');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error...'));
db.once('open', function callback() {
    console.log('heroku_app35953932 db opened');
});

module.exports = mongoose;
