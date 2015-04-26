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
			{title: 'All Day Event',start: new Date(y, m, 1)},
			{title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
			{title: 'normal event1',start: new Date(y, m, d - 3, 16, 0),allDay: false},
			{title: 'normal event2',start: new Date(y, m, d - 2, 16, 0),allDay: false},
			{title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
			{title: 'unscheduled event1',start: null, allDay: false},
			{title: 'unscheduled event2',start: null, allDay: false},
			{title: 'unscheduled event3',start: null, allDay: false},
		];
		
		$scope.uiModel = {
			// allActivities: Plan.tempPlan.activities;
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
				droppable: true,
				drop: onDrop
			}
		};

		$scope.savePlan = savePlan;

		function scheduledFilter(activities) {
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

		function updateUiModels() {
			$scope.uiModel.scheduledActivities = scheduledFilter($scope.uiModel.allActivities);
			$scope.uiModel.unscheduledActivities = _.difference($scope.uiModel.allActivities, $scope.uiModel.scheduledActivities);
			$scope.uiModel.eventSources[0] = $scope.uiModel.scheduledActivities;
		}



		function savePlan() {}

	}]);
})();