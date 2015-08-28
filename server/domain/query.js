'use strict';

(function(window){
  var fs = require('fs');
  var cateData = JSON.parse(fs.readFileSync('utils/category.json', 'utf8'));
  var CategoryUtil = require('../utils/categoryUtil');
  var cateUtil = new CategoryUtil(cateData);
  /**
   * Constructor of query result
   * @param {Object} query input result of foursquare explore and search API
   */
  var Query = function(query){
    this.venues = [];

    this.queryToVenues = function(query) {
      var result;
      if(query.response.hasOwnProperty("groups")){
        // Explore result
        result = query.response.groups[0].items.map(function(item){
          return JSON.parse(JSON.stringify(item.venue));
        });
      }else if(query.response.hasOwnProperty("venues")){
        // Search result
        result = JSON.parse(JSON.stringify(query.response.venues));
      }else{
        // Error
        throw "Invalid query (from query.js)";
      }
      return result;
    }

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

    this.appendData = function(query) {
      var venues = this.queryToVenues(query);
      this.appendVenues(venues);
    }

    // init
    this.appendData(query);

    /**
     * Get a list of venue data
     * @return {Array} list of venues of current query
     */
    this.getVenues = function(){
      return this.venues;
    }

    /**
     * Get N places that most worth visiting.
     * @param {Number}
     * @return {Array} a list of venue data
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
     * Change venues to multi Hierarchy Categories
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
     * return a list of venue name, example of map.
     */
    this.getNames = function(){
      var result = this.venues.map(function(venue){
        return venue.name;
      });
      return result;
    }

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
