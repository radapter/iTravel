'use strict';

VenueFactory.$inject = ['$http', '$q'];
angular.module('iTravelApp').factory('Venue', VenueFactory);

function VenueFactory($http, $q) {
	
	/**
	 * constructor
	 */
	function Venue(config) {
		angular.extend(this, config);
	}

	// instance properties/methods
	Venue.prototype = {
		addToTrip: addToTrip,
		removeFromTrip: removeFromTrip
	};

	// static properties/methods
	Venue.data = [];
	Venue.explore = explore;


	/**
	 * call the backend foursquare proxy
	 * @return {promise}
	 */
	function explore(params) {
		var deferred = $q.defer();

		$http.get('foursquare/explore', {
			cache: true,
			params: params
		}).then(function(res) {
			var venueArray;
			console.log('res from calling backend', res);
			if(res.status > 399) {
				deferred.reject(res.meta.message);
			} else {
				venueArray = _.map(res.data.items, function(item){
					return new Venue(item.venue);
				});
				Venue.data = venueArray;
				deferred.resolve(Venue.data);
			}
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	function addToTrip() {
		/*
		implementation
		 */
	}

	function removeFromTrip() {
		/*
		implementation
		 */
	}

	return VenueType;
};