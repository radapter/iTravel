'use strict';

HttpInterceptorFactory.$inject = ['$injector', '$q', '$location'];
angular.module('iTravelApp').factory('HttpInterceptor', HttpInterceptorFactory);

function HttpInterceptorFactory($injector, $q, '$location') { // use $injector instead of $http to avoid circular dependency
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
					// upon unauthorized requests, pop up modal and ask user to login/signup
					// delay the injection of $http to run time so http interceptor won't complain circular dependency
					$injector.invoke(function($http) { 
						loginModal = loginModal || $injector.get('loginModal');
						loginModal.showModal().then(function(user) {
							// 1. user login/signup successful
							console.log('forced user login is successful. Current user:', user);
							$http(originalRes.config).then(function(res){
								deferred.resolve(res);
							});
						}, function() {
							// 2. user clicked the cancel button of login/signup modal
							// TODO: redirect user to landing page
							$location.url('/');
							deferred.resolve(originalRes);
						});
				 	});
				}
			} else if (originalRes.status >= 400) {
				// $location.url(xxx);
				console.log('$http error intercepted(not 401). Res:', originalRes);
				deferred.reject(originalRes.status);
			} else {
				deferred.resolve(originalRes);
			}

			return deferred.promise;
		}
	};
}