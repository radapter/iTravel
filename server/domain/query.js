'use strict';

(function(window){
  /**
   * Constructor of query result
   * @param {Object} query input result of foursquare explore and search API
   */
  var Query = function(query){
    var venues = [];
    if(query.response.hasOwnProperty("groups")){
      // Explore result
      venues = query.response.groups[0].items.map(function(item){
        return item.venue;
      });
    }else if(query.response.hasOwnProperty("venues")){
      // Search result
      venues = query.response.venues;
    }else{
      // Error
      throw "Invalid query (from query.js)";
    }

    /**
     * return a list of venue data
     */
    this.getVenues = function(){
      return venues;
    }

    /**
     * return a list of venue name, example of map.
     */
    this.getNames = function(){
      var result = venues.map(function(venue){
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
