'use strict';

var async = require('async');
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

/**
 * Feeling lucky
 */
router.get('/lucky', function(req, res) {
  var params = req.query;
  params.venuePhotos = 1;
  params.limit = 50;

  var startDate;
  if(params.startDate == undefined) {
    startDate = new Date();
  } else {
    startDate = new Date(params.startDate);
  }

  var endDate;
  if(params.endDate == undefined) {
    endDate = new Date();
    endDate.setDate(startDate.getDate() + 2);
  } else {
      endDate = new Date(params.endDate);
  }

  var plan = {};
  plan.startDate = new Date(startDate.getTime());
  plan.endDate = new Date(endDate.getTime());

  var days = endDate.getDate() - startDate.getDate() + 1;
  var schedule = [
    {
      activitiesType:'attractions',
      start:new Date(1970, 0, 1, 8, 0, 0),
      end:new Date(1970, 0, 1, 9, 30, 0)
    },
    {
      activitiesType:'attractions',
      start:new Date(1970, 0, 1, 10, 0, 0),
      end:new Date(1970, 0, 1, 11, 30, 0)
    },
    {
      activitiesType:'restaurants',
      start:new Date(1970, 0, 1, 12, 0, 0),
      end:new Date(1970, 0, 1, 13, 30, 0)
    },
    {
      activitiesType:'attractions',
      start:new Date(1970, 0, 1, 14, 0, 0),
      end:new Date(1970, 0, 1, 15, 30, 0)
    },
    {
      activitiesType:'attractions',
      start:new Date(1970, 0, 1, 16, 0, 0),
      end:new Date(1970, 0, 1, 17, 30, 0)
    },
    {
      activitiesType:'restaurants',
      start:new Date(1970, 0, 1, 18, 0, 0),
      end:new Date(1970, 0, 1, 19, 30, 0)
    }
  ];

  var visitPerDay = 4; // TODO calculate it;

  async.parallel({
    sights: function(done){
      var sightParams = JSON.parse(JSON.stringify(params));
      sightParams.section = 'sights';
      fourSquareProxy.explore(sightParams, function(err, data) {
        done(err, data);
      });
    },
    arts: function(done){
      var artParams = JSON.parse(JSON.stringify(params));
      artParams.section = 'arts';
      fourSquareProxy.explore(artParams, function(err, data) {
        done(err, data);
      });
    },
    outdoors: function(done){
      var outdoorParam = JSON.parse(JSON.stringify(params));
      outdoorParam.section = 'outdoors';
      fourSquareProxy.explore(outdoorParam, function(err, data) {
        done(err, data);
      });
    },
    food: function(done){
      var foodParam = JSON.parse(JSON.stringify(params));
      foodParam.section = 'food';
      fourSquareProxy.explore(foodParam, function(err, data) {
        done(err, data);
      });
    }
  },function(err, results) {
      var attractions = new Query(results.sights);
      attractions.appendData(results.arts);
      attractions.appendData(results.outdoors);

      attractions.selectTopVenues(days * visitPerDay);
      attractions.sortVenuesByPath(days);
      attractions = attractions.addCategoryHierarchy();
      console.log("attractions:" + attractions.length);

      var dinings = new Query(results.food);
      dinings = dinings.addCategoryHierarchy();
      console.log("restaurants:" + dinings.length);

      plan.destName = results.sights.response.geocode.displayString;
      plan.destLat = results.sights.response.geocode.center.lat;
      plan.destLng = results.sights.response.geocode.center.lng;

      var activities = [];
      for(var day = 0; day < days; day++){
        for(var idx in schedule) {
          var item = schedule[idx];
          item.start.setFullYear(startDate.getFullYear());
          item.start.setMonth(startDate.getMonth());
          item.start.setDate(startDate.getDate() + day);
          item.end.setFullYear(startDate.getFullYear());
          item.end.setMonth(startDate.getMonth());
          item.end.setDate(startDate.getDate() + day);
          console.log(item);
          if(item.start < startDate || item.end > endDate)
            continue;

          var activity = {};
          activity.start = new Date(item.start.getTime());
          activity.end = new Date(item.end.getTime());

          var typeName = item.activitiesType;
          if (typeName == 'attractions' && attractions.length > 0) {
            activity.activitiesType = 'attractions';
            activity.venue = attractions.shift();
            activity.title = activity.venue.name;
            activities.push(activity);
          } else if (typeName == 'restaurants' && dinings.length > 0) {
            activity.activitiesType = 'restaurants';
            // TODO find the nearest restaurant, now is just a random one
            activity.venue = dinings.shift();
            activity.title = activity.venue.name;
            activities.push(activity);
          }
        }
      }

      plan.activities = activities;
      res.json(plan);
  });
});

module.exports = router;
