'use strict';
(function(){

	angular.module('iTravelApp')
	.directive('venueElection', [function(){
		return {
			restrict: 'A',
			templateUrl: 'templates/venueSelector/venueElection.html',
			replace: true,
			scope: {
				venue: '@'
			},
			link:link
		};
	}]);

	function link(scope, elem, attr) {

	}
})();