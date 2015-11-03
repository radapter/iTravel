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

		$scope.setMainDisplay = function(photo) {
			console.log("main display photo: ", photo);
		};

		(function init() {
			console.log('targetVenue:', targetVenue);
			Venue.getDetails(targetVenue.id).then(function(venueDetails) {
				$scope.uiModel.venueDetails = venueDetails;
				$scope.uiModel.targetVenue = targetVenue;
				console.log('uiModel:', $scope.uiModel);

				$scope.map = {
				    center: { latitude: venueDetails.location.lat, longitude: venueDetails.location.lng},
				    options:{
				        // disableDefaultUI: false,
				        // scrollwheel: false,
				        scaleControl: true,
				        //panControl: false,
				        //navigationControl: false,
				        //draggable: false,
				        // mapTypeControl: true
				    },
				    zoom: 15
				};
				$scope.marker = {
				    id: 0,
				    coords: {
				        latitude: venueDetails.location.lat,
				        longitude: venueDetails.location.lng
				    },
				    options: {},
				    events: {}
				};
			}, function() {
				// handle error
			});
		})();

	}]);
})();