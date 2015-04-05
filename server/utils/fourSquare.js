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
    var date = '20150331'
    var credentials = {
      'v': date,
      'client_id': client_id,
      'client_secret': client_secret
    };

    return {
      /**
       * Foursquare explore api. see https://developer.foursquare.com/docs/venues/explore
       * @param  {Object}   params   a json object of parameters to send to the end point
       * @param  {Function} callback function to call back
       * @return {Function}            callback(error, body)
       */
      explore: function(params, callback){
        var url = "https://api.foursquare.com/v2/venues/explore";
        url = url + "?" + querystring.stringify(params) + "&" + querystring.stringify(credentials);
        return request(url, function(error, response, body){
          return wrap(response, body, callback);
        });
      }
    };
  };

  //wrap for sending error for unexpected status code
  wrap = function(response, body, callback){
    // callback(error, body)
    if (response.statusCode >= 300) {
      return callback(body, null);
    } else {
      return callback(null, JSON.parse(body));
    }
  }

}).call(this);
