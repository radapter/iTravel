'use strict';

ActivityFactory.$inject = ['$http', '$q', 'Venue'];
angular.module('iTravelApp').factory('Activity', ActivityFactory);

function ActivityFactory($http, $q, Venue) {
	
	// constructor
	function Activity(config) {
		angular.extend(this, config);

		if (!(this.venue instanceof Venue)) {
			this.venue = new Venue(this.venue);
		}
	}

	// instance properties/methods
	Activity.purify = purify;

	// static properties/methods
	Activity.create = create;


	/**
	 * Create a new activity; add to plan if specified
	 * @param  {[type]} venue            [description]
	 * @param  {[type]} activitiesType   [description]
	 * @param  {[type]} title   		 [description]
	 * @param  {[type]} start            [description]
	 * @param  {[type]} end              [description]
	 * @return {[type]}                  [description]
	 */
	function create(venue, activitiesType, title, start, end) {

		var newActivity = new Activity({
			venue: venue,
            activitiesType: activitiesType,
            title: title ? title : 'unnamed activity',
			start: start ? start : null,
			end: end ? end: null
		});

		return newActivity;
	}


	/**
	 * Get a copy of activities with all unused properties removed. This is necessary because in activity scheduler
	 * 	activities are extended with widget-specific properties that cause circular reference problems.
	 * @param  {Activity[]} activityArray Activities to be purified
	 * @return {Activity[]}               Purified activities
	 */
	function purify(activityArray) {
		var purified = _.map(activityArray, function(activity) {
			return new Activity({
				venue: activity.venue,
				activitiesType: activity.activitiesType,
				title: activity.title,
				start: activity.start,
				end: activity.end
			});
		});
		
		return purified;
	}

	return Activity;
}