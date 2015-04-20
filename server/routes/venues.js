'use strict';

//venues router

var express = require('express');
var restify = require('express-restify-mongoose');
var Venue = require('../models/venue');
var router = express.Router();


restify.serve(router, Venue);

module.exports = router;
