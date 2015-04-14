'use strict';

PlanFactory.$inject = ['$http', '$q' ,'Resource'];
angular.module('iTravelApp').factory('Plan', PlanFactory);

function PlanFactory($http, $q, Resource) {
	
	// constructor
	function Plan(config) {
		angular.extend(this, config);
	}

	// instance properties/methods
	Plan.prototype = Object.create(Resource.prototype);
	Plan.prototype.getLlStr = getLlStr;
	Plan.prototype.addActivity = addActivity;

	// static properties/methods
	Plan.userPlans = [];
	Plan.create = create;

	function getLlStr() {
		if (this.destLat && this.destLng) {
			return this.destLat.toString + ',' + this.destLng.toString;
		} else {
			return '';
		}
	}

	function addActivity(activity) {
		this.activities.push(activity);
		this.save();
	}

	/**
	 * Create a new Plan and sync it to backend
	 * @param  {number} userId    
	 * @param  {string} destAddr  Destination address, from geocoding
	 * @param  {number} destLat   Destination address, from geocoding
	 * @param  {number} destLng   Destination address, from geocoding
	 * @param  {date} startDate   Plan start date
	 * @param  {date} endDate     Plan end date
	 * @return {Plan}             The Plan just been created
	 */
	function create(userId, destAddr, destLat, destLng, startDate, endDate) {

		var newPlan = new Plan({
			destAddr: destAddr,
			destLat: destLat,
			destLng: destLng,
			startDate: startDate,
			endDate: endDate,
			activities: [],
			active: true,
		});

		newPlan.save();
		Plan.userPlans.push(newPlan);

		return newPlan;
	}

	return Plan;
}