(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('ActivitySchedulerCtrl', ['$scope', '$location', 'User', 'Plan', 'Activity', 'Venue', 
	function($scope, $location, User, Plan, Activity, Venue) {
		$scope.uiModel = {
			activities: Plan.tempPlan.activities
		};

		$scope.

		$scope.uiConfig = {
			calendar:{
				height: 450,
				editable: true,
				header:{
				left: 'month basicWeek basicDay agendaWeek agendaDay',
					center: 'title',
					right: 'today prev,next'
				},
				dayClick: $scope.alertEventOnClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize
			}
		};

		$scope.savePlan = savePlan;


		function savePlan() {}

	}]);
})();