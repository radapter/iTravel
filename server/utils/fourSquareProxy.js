'use strict';

(function(){
  var request = require("request");
  var querystring = require('querystring');

  /**
   * Wrapper for handling unexpected status code
   * @private
   * @param  {Object}   response response object
   * @param  {Object}   body     response data
   * @param  {Function} callback function call when finished: callback(error, body)
   */
  var wrap = function(response, body, callback){
    // callback(error, body)
    if (response.statusCode >= 300) {
      callback(body, null);
    } else {
      callback(null, JSON.parse(body));
    }
  };

  /**
   * Foursquare Proxy.
   * @constructor
   * @param  {String} client_id     API Key
   * @param  {String} client_secret API Secret
   * @return {Object}               Foursquare Proxy Object
   */
  module.exports = function(client_id, client_secret){
    var date = (new Date()).toISOString().substring(0,10).replace(/-/g,"");
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
       * @param  {Function} callback function call when finished: callback(error, body)
       */
      explore: function(params, callback){
        if(params.ll == undefined && params.near == undefined){
          callback({}, null);
        }

        var url = baseURL + "venues/explore";
        url = url + "?" + querystring.stringify(params) + "&" + querystring.stringify(credentials);

        request(url, function(error, response, body){
          wrap(response, body, callback);
        });
      },

      /**
       * Foursquare search api. see https://developer.foursquare.com/docs/venues/search
       * @param  {Object}   params   a json object of parameters to send to the end point
       * @param  {Function} callback function call when finished: callback(error, body)
       */
      search: function(params, callback){
        if(params.ll == undefined && params.near == undefined){
          callback({}, null);
        }

        var url = baseURL + "venues/search";
        url = url + "?" + querystring.stringify(params) + "&" + querystring.stringify(credentials);

        request(url, function(error, response, body){
          wrap(response, body, callback);
        });
      },

      /**
       * Foursquare venue api. see https://developer.foursquare.com/docs/venues/venues
       * @param  {String}   id       Foursquare id of this venue
       * @param  {Function} callback callback function call when finished: callback(error, body)
       */
      getVenue: function(id, callback) {
        var url = baseURL + "venues/" + id;
        url = url + "?" + querystring.stringify(credentials);

        request(url, function(error, response, body) {
          wrap(response, body, callback);
        });
      },
    };
  };

}).call(this);
