(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('ActivitySchedulerCtrl', ['$scope', '$location', 'User', 'Plan', 'Activity', 'Venue', 
	function($scope, $location, User, Plan, Activity, Venue) {
		// fake data
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		var fakeData = [
			{start: new Date(y, m, d - 3, 16, 0), allDay: false, venue: {name: 'venue1', categories: ['catgory1']}},
			{start: new Date(y, m, d - 2, 16, 0), allDay: false, venue: {name: 'venue2', categories: ['catgory1']}},
			{start: null, allDay: false, venue: {name: 'venue3', categories: ['catgory1']}},
			{start: null, allDay: false, venue: {name: 'venue4', categories: ['catgory1']}},
			{start: null, allDay: false, venue: {name: 'venue5', categories: ['catgory1']}},
			{start: null, allDay: false, venue: {name: 'venue6', categories: ['catgory1']}},
			{start: null, allDay: false, venue: {name: 'venue7', categories: ['catgory1']}},
			{start: null, allDay: false, venue: {name: 'venue8', categories: ['catgory1']}},
			{start: null, allDay: false, venue: {name: 'venue9', categories: ['catgory1']}}
		];
		
		$scope.uiModel = {
			// allActivities: Plan.tempPlan.activities;
			activityFilter: '',
			allActivities: fakeData,
			eventSources: []
		};

		updateUiModels();

		$scope.uiConfig = {
			calendar:{
				height: 450,
				editable: true,
				defaultView: 'agendaWeek',
				firstDay: 1,
				header:{
					left: 'month agendaWeek agendaDay',
					right: 'today prev,next'
				},
				// eventDataTransform: activityTo
				droppable: true,
				drop: onDrop,
				eventDragStop: onEventDragStop,
				dragRevertDuration: 0,
				eventColor: '#16A085'
			}
		};

		$scope.savePlan = savePlan;

		function getScheduled(activities) {
			var scheduledActivities = _.filter(activities, function(activity) {
				return activity.start !== null;
			});

			return scheduledActivities;
		}

		function onDrop(start, end, evt) {
				var activity = angular.element(evt.target).scope().activity;

				activity.start = start;
				updateUiModels();
		}

		function onEventDragStop(activity, evt, helper, view) {
			// console.log('onEventDragStop is called');
			// console.log('activity', activity);
			// console.log('evt', evt);
			// console.log('helper', helper);
			// console.log('view', view);
		
			console.log('toElement', evt.toElement);

			if ($(evt.toElement).hasClass('unscheduled-list')) {
				console.log('event move back to unscheduled list')
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



		function savePlan() {}

	}]);
})();