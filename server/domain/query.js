(function(window){
  var Query = function(query){
    var items = query.response.groups[0].items;
    var venues = items.map(function(item){
      return item.venue;
    });

    this.getItems = function(){
      return items;
    }

    this.getVenues = function(){
      return venues;
    }

    this.getNames = function(){
      var result = venues.map(function(venue){
        return venue.name;
      });
      return result;
    }
    return this;
  };
  module.exports = Query;
})(this);
