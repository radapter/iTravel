'use strict';

var async = require('async');
var express = require('express');
var router = express.Router();
var secrets = require('../secrets');
var fourSquareProxy = (require('../utils/fourSquareProxy'))(secrets.fourSquareId, secrets.fourSquareSecret);
var Query = require('../domain/venueQuery');
var CONST = require('../domain/constant');

/**
 * GET /foursquare/
 * Test end point.
 * @return a success object
 */
router.get('/', function(req, res) {
  res.json({success: true});
});

/**
 * GET /foursquare/venues/:venueId
 * get details of a venue with an foursquare id
 * @param  {venueId} :venueId  foursquare id if the venue
 * @return {Object}            venue object
 */
router.get('/venues/:venueId', function(req, res) {
  fourSquareProxy.getVenue(req.params.venueId, function(err, data) {
    if (err) {
      console.log('foursquare/:venueId Err:', err);
      res.status(404).json(JSON.parse(err));
      return;
    }
    res.json(data.response.venue);
  });
});

/**
 * GET /foursquare/explore
 * API for explore via foursquare. Find good venues around a location
 * @param  ll       latitude, longituede @example 44.3,37.2
 * @param  near     name of location  @example Chicago, IL
 * @param  section  one of [food, drinks, coffee, shops, arts, outdoors, sights]
 * @param  query    what wanna search, @example donuts
 * @param  limit    number of results, from 1 to 50
 * @return {Array}               a list of venues
 */
router.get('/explore', function(req, res) {
  var params = req.query;
  params.venuePhotos = 1;
  fourSquareProxy.explore(params, function(err, data) {
    if (err) {
      console.log('foursquare/explore Err:', err);
      res.status(500).json(JSON.parse(err));
      return;
    }
    //modify and save venues to db .... TO BE DONE
    var query = new Query(data);
    var venues = query.addCategoryHierarchy();

    res.json(venues);
  });
});

/**
 * GET /foursquare/autoplan
 * Auto Plan feature. Will give recommanded route base on start and end date
 * must have one of ll or near
 * start Date will be now if not provided, end date is 48 hours after start date
 * @param  ll         latitude, longituede @example 44.3,37.2
 * @param  near       name of location  @example Chicago, IL
 * @param  startDate  milliseconds or dateString
 * @param  endDate    milliseconds or dateString
 * @param  bl         blacklist of venue id. e.g. ?bl[0]=1&bl[1]=2&bl[3]=3
 * @return {Object}   plan object
 */
router.get('/autoplan', function(req, res) {
  var params = req.query;
  params.venuePhotos = 1;
  params.limit = 50;
  var blacklist = params.bl;

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

  var days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  var schedule = CONST.SCHEDULE;

  var visitPerDay = 4; // TODO calculate it;

  async.parallel({
    sights: function(done){
      var sightParams = JSON.parse(JSON.stringify(params));
      sightParams.section = CONST.SECTION.SIGHTS;
      fourSquareProxy.explore(sightParams, function(err, data) {
        done(err, data);
      });
    },
    arts: function(done){
      var artParams = JSON.parse(JSON.stringify(params));
      artParams.section = CONST.SECTION.ARTS;
      fourSquareProxy.explore(artParams, function(err, data) {
        done(err, data);
      });
    },
    outdoors: function(done){
      var outdoorParam = JSON.parse(JSON.stringify(params));
      outdoorParam.section = CONST.SECTION.OUTDOORS;
      fourSquareProxy.explore(outdoorParam, function(err, data) {
        done(err, data);
      });
    },
    food: function(done){
      var foodParam = JSON.parse(JSON.stringify(params));
      foodParam.section = CONST.SECTION.FOOD;
      foodParam.radius = 50000; // find restaurants from 50km radius
      fourSquareProxy.explore(foodParam, function(err, data) {
        done(err, data);
      });
    }
  },function(err, results) {
      var attractions = new Query(results.sights);
      attractions.appendData(results.arts);
      attractions.appendData(results.outdoors);

      if(blacklist != undefined)
        attractions.filterOutById(blacklist);
      attractions.selectTopVenues(days * visitPerDay);
      attractions.sortVenuesByPath(days);
      attractions = attractions.addCategoryHierarchy();

      var dinings = new Query(results.food);
      if(blacklist != undefined)
        dinings.filterOutById(blacklist);
      dinings.addCategoryHierarchy();

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
          if(item.start < startDate || item.end > endDate)
            continue;

          var activity = {};
          activity.start = new Date(item.start.getTime());
          activity.end = new Date(item.end.getTime());

          var typeName = item.activitiesType;
          if (typeName == CONST.ActivitiesType.ATTRACTIONS && attractions.length > 0) {
            activity.activitiesType = CONST.ActivitiesType.ATTRACTIONS;
            activity.venue = attractions.shift();
            activity.title = activity.venue.name;
            activities.push(activity);
          } else if (typeName == CONST.ActivitiesType.RESTAURANTS && dinings.getVenues().length > 0) {
            activity.activitiesType = CONST.ActivitiesType.RESTAURANTS;
            var prev = activities.slice(-1)[0];
            if(prev != undefined)
              dinings.sortVenuesByDistance(prev.venue); // last one
            activity.venue = dinings.getVenues().shift();
            activity.title = activity.venue.name;
            activities.push(activity);
          }
        }
      }

      plan.activities = activities;
      res.json(plan);
  });
});

/**
 * GET /foursquare/backup
 * Give a list of backup venue for client to use.
 * Currently not black listed
 * @param  ll         latitude, longituede @example 44.3,37.2
 * @param  near       name of location  @example Chicago, IL
 * @param  bl         blacklist of venue id. e.g. ?bl[0]=1&bl[1]=2&bl[3]=3
 * @return {Object}   array of attractions and array of dinings
 */
router.get('/backup', function(req, res) {
  var params = req.query;
  params.venuePhotos = 1;
  params.limit = 50;
  var blacklist = params.bl;

  async.parallel({
    sights: function(done){
      var sightParams = JSON.parse(JSON.stringify(params));
      sightParams.section = CONST.SECTION.SIGHTS;
      fourSquareProxy.explore(sightParams, function(err, data) {
        done(err, data);
      });
    },
    arts: function(done){
      var artParams = JSON.parse(JSON.stringify(params));
      artParams.section = CONST.SECTION.ARTS;
      fourSquareProxy.explore(artParams, function(err, data) {
        done(err, data);
      });
    },
    outdoors: function(done){
      var outdoorParam = JSON.parse(JSON.stringify(params));
      outdoorParam.section = CONST.SECTION.OUTDOORS;
      fourSquareProxy.explore(outdoorParam, function(err, data) {
        done(err, data);
      });
    },
    food: function(done){
      var foodParam = JSON.parse(JSON.stringify(params));
      foodParam.section = CONST.SECTION.FOOD;
      foodParam.radius = 50000; // find restaurants from 50km radius
      fourSquareProxy.explore(foodParam, function(err, data) {
        done(err, data);
      });
    }
  },function(err, results) {
      var attractions = new Query(results.sights);
      attractions.appendData(results.arts);
      attractions.appendData(results.outdoors);

      if(blacklist != undefined)
        attractions.filterOutById(blacklist);
      attractions.scoreInContext();
      attractions = attractions.addCategoryHierarchy();

      var dinings = new Query(results.food);
      if(blacklist != undefined)
        dinings.filterOutById(blacklist);
      dinings = dinings.addCategoryHierarchy();

      var result = {};
      result.attractions = attractions;
      result.dinings = dinings;
      res.json(result);
  });
});

module.exports = router;
