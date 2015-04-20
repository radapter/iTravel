'use strict';

var express = require('express');
var router = express.Router();
var fourSquareProxy = (require('../utils/fourSquareProxy'))("Z4K0IZ0P0UOLQ5DRTP4LLU32TJVTAP50MFKEKXOP5NAPFFEK", "JXZT5MFR54XBZFHLQ440UQGSRVXQNJ42C33QDH1VL2GA0YDD");

/* GET home page. */
router.get('/', function(req, res) {
  res.json({success: true});
});

router.get('/explore', function(req, res) {
	var query = req.query;
	fourSquareProxy.explore(query, function(err, data) {
		if (err) {
			console.log('foursquare/explore Err:', err);
			res.sendStatus(500);
		}

		//modify and save venues to db .... TO BE DONE



		res.json(data.response.groups[0]);
	});
});

module.exports = router;
