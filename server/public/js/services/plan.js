'use strict';

PlanFactory.$inject = ['$http', '$q'];
angular.module('iTravelApp').factory('Plan', PlanFactory);

function PlanFactory($http, $q) {
	
	// constructor
	function Plan(config) {
		angular.extend(this, config);
	}

	// instance properties/methods
	//Plan.prototype = Object.create(Resource.prototype);
	Plan.prototype.getLlStr = getLlStr;
	Plan.prototype.addActivity = addActivity;

	// static properties/methods
	Plan.tempPlan = {};
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
	 * @param  {string} destName  Destination address, from geocoding
	 * @param  {number} destLat   Destination address, from geocoding
	 * @param  {number} destLng   Destination address, from geocoding
	 * @param  {date} startDate   Plan start date
	 * @param  {date} endDate     Plan end date
	 * @return {Plan}             The Plan just been created
	 */
	function create(destName, destLat, destLng, startDate, endDate) {

		var newPlan = new Plan({
			destName: destName,
			destLat: destLat,
			destLng: destLng,
			startDate: startDate,
			endDate: endDate,
			activities: [],
			active: true
		});

		//newPlan.save();
		Plan.tempPlan = newPlan;

		return newPlan;
	}

	return Plan;
}