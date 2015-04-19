'use strict';

//mongoose connection
var mongoose = require('mongoose');
var secrets = require('../secrets');

mongoose.connect(secrets.mongoConnStr);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error...'));
db.once('open', function callback() {
    console.log('heroku_app35953932 db opened');
});

module.exports = mongoose;
