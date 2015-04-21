'use strict';

VenueFactory.$inject = ['$http', '$q'];
angular.module('iTravelApp').factory('Venue', VenueFactory);

function VenueFactory($http, $q) {
	
	// constructor
	function Venue(config) {
		angular.extend(this, config);
	}

	// instance properties/methods
	Venue.prototype = {
	};

	// static properties/methods
	Venue.searchResults = [];
	Venue.explore = sortedExplore;


	/**
	 * 
	 */
	function sortedExplore(params) {
		angular.extend(params, {limit: 50});

		var promiseHash = {
			drinks: singleExplore(angular.extend(params, {dining: 'drinks'})),
			food: singleExplore(angular.extend(params, {dining: 'food'})),
			arts: singleExplore(angular.extend(params, {attraction: 'arts'})),
			outdoors: singleExplore(angular.extend(params, {attraction: 'outdoors'})),
			sights: singleExplore(angular.extend(params, {attraction: 'sights'})),
			hotels: singleExplore(angular.extend(params, {query: 'Hotel'}))
		};

		return $q.all(promiseHash)
			.then(function success(resultsHash) {
				var sortedResults = {};
				sortedResults.restaurants = _.uniq([].concat(resultsHash.drinks, resultsHash.food), '_id');
				sortedResults.attractions = _.uniq([].concat(resultsHash.arts, resultsHash.outdoors, resultsHash.sights), '_id');
				sortedResults.hotels = resultsHash.hotels;

				return sortedResults;
			}, function fail() {
				return $q.reject();
			});
	}

	/**
	 * call the backend foursquare proxy
	 * @return {promise}
	 */
	function singleExplore(params) {
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
				deferred.resolve(Venue.venueArray);
			}
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	return Venue;
}