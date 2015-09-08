'use strict';

HttpInterceptorFactory.$inject = ['$injector', '$q', '$location', 'toastr'];
angular.module('iTravelApp').factory('HttpInterceptor', HttpInterceptorFactory);

function HttpInterceptorFactory($injector, $q, $location, toastr) { // use $injector instead of $http to avoid circular dependency
	var loginModal;
	return {
		/**
		 * Run when Ajax calls return an error status code
		 * @param  {object} originalRes Angular $http response object
		 * @return {object}            	A promise object that represents the result of error resulotion
		 */
		'responseError': function(originalRes) {
			var deferred = $q.defer();

			console.log('responseError is called. originalRes:', originalRes);
			
			if (originalRes.status === 401 ) {
				// handle 401 unauthorized error

				if (originalRes.config.nointercept) {
					deferred.resolve(originalRes);
				} else {
					// upon unauthorized requests, show message and pop up modal and ask user to login/signup
					if (originalRes.data.errorMsg === 'SessionNotEstablished') {
						toastr.info('Login is required to view the requested content.', '');
					} else if (originalRes.data.errorMsg === 'SessionExpired') {
						toastr.info('Your session is expired. Please Login again.', '');
					} else {
						toastr.info('Login is required to view the requested content.', '');
					}

					// delay the injection of $http to run time so HttpInterceptor won't complain circular dependency
					$injector.invoke(['$http', function($http) { 

						loginModal = loginModal || $injector.get('loginModal');

						loginModal.showModal().then(function succeed(user) {
							// 1. user login/signup successful
							console.log('forced user login is successful. Current user:', user);
							$http(originalRes.config).then(function(res){
								deferred.resolve(res);
							});
						}, function fail(err) {
							// 2. user clicked the cancel button or chose to signup
							if (err === 'signup') {
								// redirection is done by login modal; do nothing here
							} else if (err === 'canceled') {
								toastr.error('Oops! You are not authorized to view the requested contents', '');
							}
							deferred.reject(originalRes);

						});
				 	}]);
				}
			} else if (originalRes.status >= 400) {
				// $location.url(xxx);
				console.log('$http error intercepted(not 401). Res:', originalRes);
				deferred.reject(originalRes);
			} else {
				deferred.resolve(originalRes);
			}

			return deferred.promise;
		}
	};
}