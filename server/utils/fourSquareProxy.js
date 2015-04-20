(function(){
  var request = require("request");
  var querystring = require('querystring');
  var wrap;

  /**
   * Foursquare SDK.
   * @param  {String} client_id     API Key
   * @param  {String} client_secret API Secret
   * @return {Object}               Foursquare Object
   */
  module.exports = function(client_id, client_secret){
    //TODO date should automaticly get yyyymmdd from local server
    var date = '20150331';
    var credentials = {
      'v': date,
      'client_id': client_id,
      'client_secret': client_secret
    };
    var baseURL = "https://api.foursquare.com/v2/";

    return {
      /**
       * Foursquare explore api. see https://developer.foursquare.com/docs/venues/explore
       * @param  {Object}   params   a json object of parameters to send to the end point
       * @param  {Function} callback function to call back
       * @return {Function}            callback(error, body)
       */
      explore: function(params, callback){
        // TODO param validation
        var url = baseURL + "venues/explore";
        url = url + "?" + querystring.stringify(params) + "&" + querystring.stringify(credentials);

        // TODO better log
        // console.log('call foursquare api:', url);
        request(url, function(error, response, body){
          wrap(response, body, callback);
        });
      },
      search: function(params, callback){
        // TODO param validation
        var url = baseURL + "venues/search";
        url = url + "?" + querystring.stringify(params) + "&" + querystring.stringify(credentials);

        // TODO better log
        // console.log('call foursquare api:', url);
        request(url, function(error, response, body){
          wrap(response, body, callback);
        });
      }
    };
  };

  //wrap for sending error for unexpected status code
  wrap = function(response, body, callback){
    // callback(error, body)
    if (response.statusCode >= 300) {
      callback(body, null);
    } else {
      callback(null, JSON.parse(body));
    }
  };

}).call(this);
