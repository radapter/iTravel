'use strict';

ActivityFactory.$inject = ['$http', '$q', 'Resource', 'Plan'];
angular.module('iTravelApp').factory('Activity', ActivityFactory);

function ActivityFactory($http, $q, Resource, Plan) {
	
	// constructor
	function Activity(config) {
		angular.extend(this, config);
	}

	// instance properties/methods
	Activity.prototype = Object.create(Resource.prototype);

	// static properties/methods
	Activity.create = create;


	/**
	 * Create a new activity; add to plan if specified
	 * @param  {[type]} venue     [description]
	 * @param  {[type]} startTime [description]
	 * @param  {[type]} category  [description]
	 * @param  {[type]} duration  [description]
	 * @return {[type]}           [description]
	 */
	function create(venue, startTime, category, duration, plan) {

		var newActivity = new Activity({
			venue: venue,
			startTime: startTime,
			category: category,
			duration: duration
		});

		newActivity.save();
		if (plan && plan instanceof Plan) {
			plan.addActivities(newActivity);
		}

		return newActivity;
	}

	return Activity;
}