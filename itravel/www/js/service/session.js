'use strict';
(function() {
	SessionFactory.$inject = ['$window'];
	angular.module('iTravelApp.service.user').factory('Session', SessionFactory);

	function SessionFactory($window) {
		
		function loadAccessToken() {
			return $window.localStorage.getItem('token');
		}

		function setAccessToken(token) {
			$window.localStorage.setItem('token', token);
		}

		function destroyAccessToken() {
			$window.localStorage.removeItem('token');
		}

		return {
			loadAccessToken: loadAccessToken,
			setAccessToken: setAccessToken,
			destroyAccessToken: destroyAccessToken
		};
	}
})();