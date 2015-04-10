'use strict';

var Venue = function($http, $q) {
	
	/**
	 * constructor
	 */
	function VenueType(config) {
		angular.extend(this, config);
	}

	// instance methods
	VenueType.prototype = {

	};

	// static methods
	VenueType.getNearby = getNearby;

	/**
	 * call the search API and return a venue
	 * @return {promise}
	 */
	function getNearby(ll, radius, categoryId, query, limit) {
		var deferred = $q.defer();

		$http.get('https://api.foursquare.com/v2/venues/search', {
			cache: true,
			params: {
				ll: ll,
				radius: +radius,
				categoryId: categoryId,
				query: query,
				limit: limit
			}
		}).then(function(res) {
			var venueArray;
			if(res.meta.code > 399) {
				deferred.reject('error');
			} else {
				venueArray = _.map(res.response.venues, function(rawVenue){
					return new Venue(rawVenue);
				});
				deferred.resolve(venueArray);
			}
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	return VenueType;
};

Venue.$inject(['$http', '$q']);

//angular.module('iTravel').factory('Venue', Venue);