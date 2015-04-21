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
    if(query.response.hasOwnProperty("groups")){
      // Explore result
      this.venues = query.response.groups[0].items.map(function(item){
        return JSON.parse(JSON.stringify(item.venue));
      });
    }else if(query.response.hasOwnProperty("venues")){
      // Search result
      this.venues = JSON.parse(JSON.stringify(query.response.venues));
    }else{
      // Error
      throw "Invalid query (from query.js)";
    }

    /**
     * return a list of venue data
     */
    this.getVenues = function(){
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
