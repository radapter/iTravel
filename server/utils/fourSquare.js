(function(){
  var request = require("request");
  var querystring = require('querystring');
  var wrap;

  module.exports = function(client_id, client_secret){
    var date = '20150331'
    var credentials = {
      'v': date,
      'client_id': client_id,
      'client_secret': client_secret
    };

    return {
      explore: function(params, callback){
        var url = "https://api.foursquare.com/v2/venues/explore";
        url = url + "?" + querystring.stringify(params) + "&" + querystring.stringify(credentials);
        return request(url, function(error, response, body){
          return wrap(response, body, callback);
          // console.log(JSON.stringify(body, null, 4));
        });
      }
    };
  };

  wrap = function(response, body, callback){
    if (response.statusCode >= 300) {
      return callback(body, null);
    } else {
      return callback(null, JSON.parse(body));
    }
  }

}).call(this);
