'use strict';

ActivityFactory.$inject = ['$http', '$q', 'Plan'];
angular.module('iTravelApp').factory('Activity', ActivityFactory);

function ActivityFactory($http, $q, Plan) {
	
	// constructor
	function Activity(config) {
		angular.extend(this, config);
	}

	// instance properties/methods
	//Activity.prototype = Object.create(Resource.prototype);

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

		//newActivity.save();
		//if (plan && plan instanceof Plan) {
		//	plan.addActivities(newActivity);
		//}

		return newActivity;
	}

	return Activity;
}