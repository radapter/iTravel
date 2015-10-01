'use strict';

venueDetailsModalFactory.$inject = ['$q', '$rootScope', '$modal', '$location'];
angular.module('iTravelApp').factory('venueDetailsModal', venueDetailsModalFactory);

function venueDetailsModalFactory($q, $rootScope, $modal, $location) {
	return {
		'showModal': function(targetVenue) {
			$modal.open({
				animation: true,
				templateUrl: 'templates/venueDetailsModal.html',
				controller: 'VenueDetailsModalCtrl',
				resolve: {
					venue: function() { return targetVenue; }
				}
			});
		}
	};
}
