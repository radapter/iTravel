(function(){
	'use strict';

	angular.module('iTravelApp')
	.directive('venueGallery', [function(){
		return {
			restrict: 'AE',
			link:link,
			templateUrl: 'templates/venues/venueGallery.html',
			scope: {
				photos: '='
			}
		};
	}]);

	function link(scope, elem) {

		var windowOffset = 0;

		scope.thumbnailsWindow = [];

		scope.setMainDisplay = function(photo) {
			var imgPath = photo.prefix + 'original' + photo.suffix;

			scope.mainDisplay = photo;
			$(elem).find('.photo-main-display').css('background-image', 'url("'+imgPath+'")');
		};

		scope.revealLeft = function() {
			setWindow(windowOffset - 1);
		};
		
		scope.revealRight = function() {
			setWindow(windowOffset + 1);
		};

		function setWindow(offset) {
			if (scope.photos.length <= 5) {
				scope.thumbnailsWindow = scope.photos;
				return;
			}

			if (offset >= 0 && offset + 5 <= scope.photos.length) {
				scope.thumbnailsWindow = scope.photos.slice(offset, offset + 5);
				windowOffset = offset;
			}
		}

		(function init() {
			// set main display the first photo is loaded, then unbind the watcher
			var unbind = scope.$watch('photos', function(newVal) {
				if (newVal && newVal.length) {
					scope.setMainDisplay(scope.photos[0]);
					setWindow(0);
					unbind();
				}
 			});

		})();
	}
})();