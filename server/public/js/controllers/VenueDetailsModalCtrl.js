(function() {
	'use strict';

	angular.module('iTravelApp')
	.controller('VenueDetailsModalCtrl', ['$scope', '$modalInstance', 'Venue', 'targetVenue', function($scope, $modalInstance, Venue, targetVenue) {
		$scope.uiModel = {};

		$scope.select = function() {
			if (!_.contains(Venue.selectedVenues, targetVenue)) {
				Venue.selectedVenues.push(targetVenue);
			}
		};

		$scope.unselect = function() {
			_.without(Venue.selectedVenues, targetVenue);
		};

		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		(function init() {
			Venue.getDetails(targetVenue.id).then(function(venueData) {
				$scope.uiModel.venueData = venueData;
			}, function() {
				// handle error
			});
		})();

	}]);
})();