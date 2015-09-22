'use strict';
(function(){

	angular.module('iTravelApp')
	.directive('venueOption', [function(){
		return {
			restrict: 'A',
			templateUrl: 'templates/venueSelector/venueOption.html',
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