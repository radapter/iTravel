'use strict';

var user = require('../models/user');
var auth = require('../utils/authManager');
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
  auth.signToken(req, res);
});

router.post('/signup', function(req, res) {
	// var query = req.query;
	// fourSquareProxy.explore(query, function(err, data) {
	// 	if (err) {
	// 		console.log('foursquare/explore Err:', err);
	// 		res.sendStatus(500);
	// 	}
	// 	res.json(data.response.groups[0]);
	// });
	// 
	
	
	
});

router.get('/dashboard', auth.authenticate, function(req,res) {
	res.sendStatus('200');
});

module.exports = router;
