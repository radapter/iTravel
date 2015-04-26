(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('ActivitySchedulerCtrl', ['$scope', '$location', 'User', 'Plan', 'Activity',
	function($scope, $location, User, Plan, Activity) {
		
		$scope.uiModel = {
			// allActivities: Plan.tempPlan.activities;
			activityFilter: '',
			allActivities: Plan.tempPlan.activities,
			eventSources: []
		};

		// console.log('Plan.tempPlan.activities', Plan.tempPlan.activities);

		updateUiModels();

		$scope.uiConfig = {
			calendar:{
				height: 450,
				defaultView: 'agendaWeek',
				firstDay: 1,
				header:{
					left: 'month agendaWeek agendaDay',
					right: 'today prev,next'
				},
				// eventDataTransform: activityToEvent,
				editable: true,
				droppable: true,
				drop: onDrop,
				eventDragStop: onEventDragStop,
				dragRevertDuration: 0,
			}
		};

		$scope.savePlan = savePlan;

		function getScheduled(activities) {
			var scheduledActivities = _.filter(activities, function(activity) {
				// console.log('getScheduled: activity/activity.start',activity, activity.start);
				return activity.start !== null;
			});

			return scheduledActivities;
		}

		function onDrop(start, end, evt) {
				var activity = angular.element(evt.target).scope().activity;
				var startHour = start.getHours();
				var duration;

				activity.start = start;

				// do some activity cusomization based on activity type
				switch (activity.activitiesType) {
					case 'hotels':
						activity.allDay = true;
						activity.color = '#2C3E50';
						break;
					case 'restaurants':
						// if the start time falls in the dinner time range(4:00pm - 8:00pm) 
						// then give it 2 hours(default) else give it 1 hour.
						duration = (startHour >= 16 && startHour <= 20) ? 2 : 1;
						activity.end = new Date(start);
						activity.end.setHours(startHour + duration);
						activity.allDay = false;
						activity.color = '#D35400';
						break;
					case 'attractions':
						duration = 2;
						activity.end = new Date(start);
						activity.end.setHours(startHour + duration);
						activity.allDay = false;
						activity.color = '#16A085';
						break;
					default: 
						duration = 2;
						activity.end = new Date(start);
						activity.end.setHours(startHour + duration);
						activity.allDay = false;
						activity.color = '#16A085';
				}

				updateUiModels();
		}

		function onEventDragStop(activity, evt, helper, view) {
			// console.log('onEventDragStop is called');
			// console.log('activity', activity);
			// console.log('evt', evt);
			// console.log('helper', helper);
			// console.log('view', view);
		
			// console.log('toElement', evt.toElement);

			if ($(evt.toElement).hasClass('unscheduled-list')) {
				console.log('event move back to unscheduled list');
				activity.start = null;

				updateUiModels();
			}

			// var calendarContainer = $('#calendar-container');
			// console.log('contains test', $.contains(calendarContainer, evt.toElement));


		}

		function updateUiModels() {
			$scope.uiModel.scheduledActivities = getScheduled($scope.uiModel.allActivities);
			$scope.uiModel.unscheduledActivities = _.difference($scope.uiModel.allActivities, $scope.uiModel.scheduledActivities);
			$scope.uiModel.eventSources[0] = $scope.uiModel.scheduledActivities;

		}


		function activityToEvent(activity) {
			return activity;
		}



		$scope.onClickSavePlan = function() {
			if ($scope.uiModel.unscheduledActivities.length > 0) {
				var dlg = confirm('WARNING: There are un-scheduled activities in your list. If you proceed to save the plan they will be discarded.');
				if (dlg) {
					savePlan();
				}
			} else {
				savePlan();
			}

		}

		function savePlan() {
			if (User.currentUser) {

				Plan.tempPlan.activities = Activity.purify(Plan.tempPlan.activities);
				// Plan.tempPlan.updateStartEnd();
				User.currentUser.plans.push(Plan.tempPlan);
				// console.log('Plan.tempPlan after purification:', Plan.tempPlan);

				User.currentUser.save()
					.then(_.bind(User.currentUser.refresh, User.currentUser))
					.then(function() {
						console.log('user info saved. User:', User.currentUser);
						// console.log('new plan ts:', Plan.tempPlan.signatureTs);

						var newPlan = _.findWhere(User.currentUser.plans, {signatureTs: Plan.tempPlan.signatureTs});
						// console.log('new plan found:', newPlan);

						$location.url('plans/'+newPlan._id);
					}, function(err){
						console.log('network err', err);
					});

			} else {
				console.log('user is not logged in');
			}
		}

	}]);
})();