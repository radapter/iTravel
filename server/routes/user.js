'use strict';

var user = require('../models/user');
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
  res.json({success: true});
});

router.post('/signup', function(req, res) {
	var query = req.query;
	fourSquareProxy.explore(query, function(err, data) {
		if (err) {
			console.log('foursquare/explore Err:', err);
			res.sendStatus(500);
		}
		res.json(data.response.groups[0]);
	});
});

module.exports = router;
