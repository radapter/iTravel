'use strict';

(function(window){
  var fs = require('fs');
  var cateData = JSON.parse(fs.readFileSync('utils/category.json', 'utf8'));
  var CategoryUtil = require('../utils/categoryUtil');
  var cateUtil = new CategoryUtil(cateData);
  /**
   * Venues Query. Used for get a subset of foursquare result.
   * like topN, order, etc.
   * @constructor
   * @param {Object} data input result of foursquare explore and search API
   * @return {Object}     instance of Query object
   */
  var Query = function(data){
    this.venues = [];

    /**
     * transform raw foursquare API data to venues.
     * Currently support explore and search
     * @param  {Object} data Foursquare result of explore/search API
     * @return {Array}       list of venues object.
     */
    this.dataToVenues = function(data) {
      var result;
      if(data.response.hasOwnProperty("groups")){
        // Explore result
        result = data.response.groups[0].items.map(function(item){
          return JSON.parse(JSON.stringify(item.venue));
        });
      }else if(data.response.hasOwnProperty("venues")){
        // Search result
        result = JSON.parse(JSON.stringify(data.response.venues));
      }else{
        // Error
        throw "Invalid data (from query.js)";
      }
      return result;
    }

    /**
     * Add venues to current query. Will ignore duplicate venues.
     * @param  {Array} venues  list of venues
     */
    this.appendVenues = function(venues) {
      for (var newVenue in venues) {
        var shared = false;
        for (var currentVenue in this.venues) {
          if(venues[newVenue].id == this.venues[currentVenue].id) {
            shared = true;
            break;
          }
        }
        if(!shared) {
          this.venues.push(venues[newVenue]);
        }
      }
    }

    /**
     * Add explore/search result to current Query. Will ignore duplicates.
     * @param  {Object} data Foursquare search or explore API result
     */
    this.appendData = function(data) {
      var venues = this.dataToVenues(data);
      this.appendVenues(venues);
    }

    // init
    this.appendData(data);

    /**
     * Get a list of venue data
     * @return {Array} list of venues in current query.
     */
    this.getVenues = function(){
      return this.venues;
    }

    /**
     * Get N places that most worth visiting.
     * @param {Number} num  the number of venues want to return
     * @return {Array}      a list of venue data
     */
    this.selectTopVenues = function(num) {
      // TODO this algorithm need optimization
      // Currently its just a proof of concept sort by rating
      var compareByRating = function (a,b) {
        if (a.rating == undefined && b.rating == undefined)
          return 0;
        if (a.rating == undefined || a.rating < b.rating)
          return -1;
        if (b.rating == undefined || a.rating > b.rating)
          return 1;
        return 0;
      }
      this.venues = this.venues.sort(compareByRating).reverse().slice(0, num);
      return this.venues;
    }

    /**
     * Get the order of visiting clustered by day
     * @param  {Number} days   num of days
     * @return {Array}         venues reordered by visiting sequence
     * Point(obj.location.lat,obj.location.lng)
     */
    this.sortVenuesByPath = function(days) {
      // TODO this algorithm need optimization
      // Currently its just a proof of concept sort by longitude
      var compareByLng = function (a,b) {
        if (a.location.lng < b.location.lng)
          return -1;
        if (a.location.lng > b.location.lng)
          return 1;
        return 0;
      }
      this.venues.sort(compareByLng);
      return this.venues;
    }

    /**
     * Change venues to multi hierarchy categories.
     * with an array from the top level category to specific category.
     * @return {Array}  venues with category data changed.
     */
    this.addCategoryHierarchy = function(){
      this.venues = this.venues.map(function(venue){
        if(venue.categories.length==1){//will not add if it's multi Hierarchy already
          var id = venue.categories[0].id;
          venue.categories = cateUtil.getCategoryHierarchy(id);
        }
        return venue;
      });
      return this.venues;
    }

    /**
     * For test. Name list of current query
     * @return {Array} a list of names of venues
     */
    this.getNames = function(){
      var result = this.venues.map(function(venue){
        return venue.name;
      });
      return result;
    }

    /**
     * For test. Metrics list of current query
     * @return {Array} a list of metrics of venues
     */
    this.getMetrics = function(){
      var result = this.venues.map(function(venue){
        return [
          venue.rating,
          venue.stats.checkinsCount,
          venue.name
        ];
      });
      return result;
    }

    return this;
  };

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    // Node.js export
    module.exports = Query;
  } else {
    // Browser export
    window.iTravel.Query = Query;
  }
})(this);
