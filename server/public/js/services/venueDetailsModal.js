'use strict';

venueDetailsModalFactory.$inject = ['$q', '$rootScope', '$modal'];
angular.module('iTravelApp').factory('venueDetailsModal', venueDetailsModalFactory);

function venueDetailsModalFactory($q, $rootScope, $modal) {
	return {
		'showModal': function(targetVenue) {
			console.log('venueDetailsModal.showModal is called, targetVenue:', targetVenue);
			$modal.open({
				animation: true,
				templateUrl: 'templates/venues/venueDetailsModal.html',
				size: 'lg',
				controller: 'VenueDetailsModalCtrl',
				resolve: {
					targetVenue: function() { return targetVenue; }
				}
			});
		}
	};
}
