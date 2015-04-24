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
	 * @param  {[type]} start            [description]
	 * @param  {[type]} end              [description]
	 * @param  {[type]} activitiesType   [description]
	 * @return {[type]}                  [description]
	 */
	function create(venue, activitiesType, start, end) {

		var newActivity = new Activity({
			venue: venue,
            activitiesType: activitiesType,
			start: start,
			end: end
		});

		//newActivity.save();
		//if (plan && plan instanceof Plan) {
		//	plan.addActivities(newActivity);
		//}

		return newActivity;
	}

	return Activity;
}