angular.module('iTravelApp')
.directive('hideWhenScroll', [function(){
	return {
		restrict: 'A',
		link:link
	};
}]);

function link(scope, elem, attr) {
	var lastScrollTop = 0;

	angular.element(window).on('scroll', scrollHandler);

	function scrollHandler(evt) {
		var currScrollTop = $(this).scrollTop();
		if (currScrollTop > lastScrollTop){
			// console.log('scroll down, sliding up...');
		    elem.addClass('rd-top-n100');
			// elem.slideUp();
		} else {
			// console.log('scroll up, sliding down...');
		    elem.removeClass('rd-top-n100');
			// elem.slideDown();
		}
		lastScrollTop = currScrollTop;
	}
}