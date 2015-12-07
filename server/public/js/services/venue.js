'use strict';

VenueFactory.$inject = ['$http', '$q'];
angular.module('iTravelApp').factory('Venue', VenueFactory);

function VenueFactory($http, $q) {

	// constructor
	function Venue(config) {
		angular.extend(this, config);
		this.coords = {
			latitude: this.location.lat,
			longitude: this.location.lng
		};
	}

	// instance properties/methods
	Venue.prototype = {
	};

	// static properties/methods
	Venue.searchResults = {};
	Venue.categoryDict = {};
	Venue.selectedVenues = {};
	
	Venue.explore = sectionedExplore;
	Venue.getDetails = getDetails;


	/**
	 *
	 */
	function sectionedExplore(params) {
		angular.extend(params, {limit: 50});

		var promiseHash = {
			drinks: singleExplore(copyAndExtend(params, {section: 'drinks'}), 'restaurants'),
			food: singleExplore(copyAndExtend(params, {section: 'food'}), 'restaurants'),
			arts: singleExplore(copyAndExtend(params, {section: 'arts'}), 'attractions'),
			outdoors: singleExplore(copyAndExtend(params, {section: 'outdoors'}), 'attractions'),
			sights: singleExplore(copyAndExtend(params, {section: 'sights'}), 'attractions'),
			hotels: singleExplore(copyAndExtend(params, {query: 'Hotel'}), 'hotels')
		};



		return $q.all(promiseHash)
			.then(function success(resultsHash) {
				var sectionedresults = {};

				sectionedresults.restaurants = _.uniq([].concat(resultsHash.drinks, resultsHash.food), 'id').slice(0, 20);
				sectionedresults.attractions = _.uniq([].concat(resultsHash.arts, resultsHash.outdoors, resultsHash.sights), 'id').slice(0, 20);
				sectionedresults.hotels = resultsHash.hotels.slice(0, 10);

				Venue.searchResults = sectionedresults;
				Venue.categoryDict = getCategoryDict(sectionedresults);

				console.log('Venue.categoryDict', Venue.categoryDict);

				return sectionedresults;
			}, function fail() {
				return $q.reject();
			});
	}

	/**
	 * call the backend foursquare proxy
	 * @return {promise}
	 */
	function singleExplore(params, section) {
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
				venueArray = _.map(res.data, function(venue){
					venue.section = section;
					return new Venue(venue);
				});
				deferred.resolve(venueArray);
			}
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	function getCategoryDict(searchResults) {
		var allVenues, categoryDict = {};

		allVenues = [].concat(searchResults.restaurants, searchResults.attractions, searchResults.hotels);
		_.each(searchResults, function(venues, section){
			var categoryMap=[];

			//manual hack to put an "all" category for each venue type section
			categoryMap.push({name: "All", count: 1000, level: 1});

			_.each(venues, function(venue) {
				_.each(venue.categories, function(catetory, idx) {
					var matched = _.findWhere(categoryMap, {name: catetory.name});
					if (matched) {
						matched.count++;
					} else {
						categoryMap.push({name: catetory.name, count: 1, level: idx});
					}
				});
			});

			categoryDict[section] = _.sortBy(categoryMap, 'count');

		});

		return categoryDict;
	}

	function getDetails(venueId) {
		var deferred = $q.defer();
		$http.get('foursquare/venues/' + venueId, {
			cache: true,
		}).then(function(res) {
			if(res.status > 399) {
				deferred.reject(res.meta.message);
			} else {
				deferred.resolve(res.data);
			}
		}, function(err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}

	function copyAndExtend(src, ext) {
		return angular.extend(angular.copy(src), ext);
	}

	return Venue;
}
