'use strict';

var express = require('express');
var router = express.Router();
var fourSquareProxy = (require('../utils/fourSquareProxy'))("Z4K0IZ0P0UOLQ5DRTP4LLU32TJVTAP50MFKEKXOP5NAPFFEK", "JXZT5MFR54XBZFHLQ440UQGSRVXQNJ42C33QDH1VL2GA0YDD");
var Query = require('../domain/query');

/* GET home page. */
router.get('/', function(req, res) {
  res.json({success: true});
});

router.get('/explore', function(req, res) {
  var params = req.query;
  params.venuePhotos = 1;
  fourSquareProxy.explore(params, function(err, data) {
    if (err) {
      console.log('foursquare/explore Err:', err);
      res.sendStatus(500);
    }
    //modify and save venues to db .... TO BE DONE
    var query = new Query(data);
    var venues = query.addCategoryHierarchy();

    res.json(venues);
  });
});

module.exports = router;
