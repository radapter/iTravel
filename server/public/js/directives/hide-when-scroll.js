(function(){
	'use strict';

	angular.module('iTravelApp')
	.directive('hideWhenScroll', [function(){
		return {
			restrict: 'A',
			link:link
		};
	}]);

	function link(scope, elem) {
		var lastScrollTop = 0;

		angular.element(window).on('scroll', scrollHandler);

		function scrollHandler() {
			var currScrollTop = $(this).scrollTop();
			var allowHide = elem.hasClass('allow-hide');
			console.log('allowHide', allowHide);
			if (allowHide && currScrollTop > lastScrollTop){
			    elem.addClass('rd-top-n100');
			} else {
			    elem.removeClass('rd-top-n100');
			}
			lastScrollTop = currScrollTop;
		}
	}
})();