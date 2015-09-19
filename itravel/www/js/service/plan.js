'use strict';

PlanFactory.$inject = ['$http', '$q', 'Activity', 'host'];
angular.module('iTravelApp.service.plan',[]).factory('Plan', PlanFactory);

function PlanFactory($http, $q, Activity, host) {
	
	// constructor
	function Plan(config) {
		angular.extend(this, config);

		this.activities = _.map(this.activities, function(activity) {
			return new Activity(activity);
		});
	}

	Plan.prototype.updateStartEnd = updateStartEnd;
	// static properties/methods
	Plan.tempPlan = {};

	Plan.autoPlan = autoPlan;
	Plan.create = create;

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
			active: true,
			signatureTs: Date.now()
		});

		//newPlan.save();
		Plan.tempPlan = newPlan;

		return newPlan;
	}

	/**
	 * call the backend autoplan api
	 * @return {promise}
	 */
	function autoPlan(params) {
		var deferred = $q.defer();

		$http.get(host+'foursquare/autoplan', {
			cache: true,
			params: params
		}).then(function(res) {
			var autoPlan;
			// console.log('res from calling backend', res);
			if(res.status > 399) {
				deferred.reject(res.meta.message);
			} else {
				//autoPlan = new Plan(plan);
				console.log("in plan.autoplan");
				console.log(res);
				deferred.resolve(res.data);
			}
		}, function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	function updateStartEnd() {
		this.startDate = _.min(this.activities, function(activity) {
			return activity.start.getTime();
		}).start;

		this.endDate = _.max(this.activities, function(activity) {
			return activity.end.getTime();
		}).end;
	}

	return Plan;
}