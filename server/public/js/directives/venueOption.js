'use strict';
(function(){

	angular.module('iTravelApp')
	.directive('venueOption', [function(){
		return {
			restrict: 'A',
			templateUrl: 'templates/venueSelector/venueOption.html',
			replace: true,
			scope: {
				venue: '='
			},
			link:link
		};
	}]);

	function link(scope, elem, attr) {
		console.log(scope.venue);
		var imgPath;

		if (scope.venue.featuredPhotos) {
			imgPath = 	scope.venue.featuredPhotos.items[0].prefix + 
						'original' + 
						scope.venue.featuredPhotos.items[0].suffix;
			$(elem).css('background-image', 'url("'+imgPath+'")');
		}
	}
})();