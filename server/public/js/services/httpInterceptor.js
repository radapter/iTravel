'use strict';

HttpInterceptorFactory.$inject = ['$injector', '$q', '$rootScope', '$location'];
angular.module('iTravelApp').factory('HttpInterceptor', HttpInterceptorFactory);

function HttpInterceptorFactory($injector, $q) { // use $injector instead of $http to avoid circular dependency
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
					$injector.invoke(function($http) {
						loginModal = loginModal || $injector.get('loginModal');
						loginModal.showModal().then(function(successful) {
							if (successful) {
								console.log('forced user login is successful');
								$http(originalRes.config).then(function(res){
									deferred.resolve(res);
								});
							} else {
								deferred.resovle(originalRes);
							}
						}, function() {
							deferred.resovle(originalRes);
						});
				 	});
				}
			} else if (originalRes.status > 400) {
				// $location.url(xxx);
				deferred.reject(originalRes.status);
			} else {
				deferred.resolve(originalRes);
			}

			return deferred.promise;
		}
	};
}