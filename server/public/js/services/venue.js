'use strict';

Venue.$inject = ['$http', '$q', '$rootScope'];
angular.module('iTravelApp').factory('Venue', Venue);

function Venue($http, $q, $rootScope) {
	
	var dataStore;

	/**
	 * constructor
	 */
	function VenueType(config) {
		angular.extend(this, config);
	}

	// instance methods
	VenueType.prototype = {
		addToTrip: addToTrip,
		removeFromTrip: removeFromTrip
	};

	// static methods
	VenueType.explore = explore;


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
					return new VenueType(item.venue);
				});
				dataStore = venueArray;
				$rootScope.$broadcast('venue:reload', dataStore);
				deferred.resolve(dataStore);
			}
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	function addToTrip() {}

	function removeFromTrip() {}

	return VenueType;
};