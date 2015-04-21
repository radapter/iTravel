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
	Venue.explore = sectionedExplore;


	/**
	 * 
	 */
	function sectionedExplore(params) {
		angular.extend(params, {limit: 50});

		var promiseHash = {
			drinks: singleExplore(copyAndExtend(params, {section: 'drinks'})),
			food: singleExplore(copyAndExtend(params, {section: 'food'})),
			arts: singleExplore(copyAndExtend(params, {section: 'arts'})),
			outdoors: singleExplore(copyAndExtend(params, {section: 'outdoors'})),
			sights: singleExplore(copyAndExtend(params, {section: 'sights'})),
			hotels: singleExplore(copyAndExtend(params, {query: 'Hotel'}))
		};

		function copyAndExtend(src, ext) {
			return angular.extend(angular.copy(src), ext);
		}

		return $q.all(promiseHash)
			.then(function success(resultsHash) {
				var sectionedresults = {};
				sectionedresults.restaurants = _.uniq([].concat(resultsHash.drinks, resultsHash.food), 'id');
				sectionedresults.attractions = _.uniq([].concat(resultsHash.arts, resultsHash.outdoors, resultsHash.sights), 'id');
				sectionedresults.hotels = resultsHash.hotels;
				Venue.searchResults = sectionedresults;
				return sectionedresults;
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
			// console.log('res from calling backend', res);
			if(res.status > 399) {
				deferred.reject(res.meta.message);
			} else {
				venueArray = _.map(res.data.items, function(item){
					return new Venue(item.venue);
				});
				deferred.resolve(venueArray);
			}
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	return Venue;
}