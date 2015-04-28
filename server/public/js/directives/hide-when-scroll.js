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

		var isTrans = true;
		function scrollHandler() {
			var currScrollTop = $(this).scrollTop();

			//var allowHide = elem.hasClass('allow-hide');
			////console.log('allowHide', allowHide);
			//if (allowHide && currScrollTop > lastScrollTop){
			//    elem.addClass('rd-top-n100');
			//} else {
			//    elem.removeClass('rd-top-n100');
			//}
			//lastScrollTop = currScrollTop;

			//console.log(currScrollTop);
			//when scroll over the landing image, change navbar from transparent to nontransparent
			//fix navbar to top
			if (currScrollTop > 580) {
				elem.removeClass('top-nav-collapse');
				isTrans = false;
			}

			//console.log(isTrans);
			if (!isTrans && currScrollTop <= 580) {
				elem.addClass('top-nav-collapse');
			}

		}
	}
})();