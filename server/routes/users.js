'use strict';

//users router

var express = require('express');
var restify = require('express-restify-mongoose');
var User = require('../models/user');
var router = express.Router();


restify.serve(router, User);

module.exports = router;

