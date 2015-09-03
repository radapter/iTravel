'use strict';

HttpInterceptorFactory.$inject = ['$injector', '$q', '$rootScope', '$location'];
angular.module('iTravelApp').factory('HttpInterceptor', HttpInterceptorFactory);

function HttpInterceptorFactory($injector, $q) {
	var loginModal;
	return {
		'responseError': function(originalRes) {
			var deferred = $q.defer();

			if (originalRes.status === 401 ) {
				if (originalRes.config.nointercept) {
					console.log('401 erorr is ignored');
					deferred.resolve(originalRes);
				} else {
					console.log('401 erorr is intercepted');
					$injector.invoke(function($http) {
						loginModal = loginModal || $injector.get('loginModal');
						loginModal.showModal().then(function(successful) {
							if (successful) {
								console.log('forced user login is successful');
								$http(originalRes.config).then(function(res){
									deferred.resolve(res);
								});
							} else {
								deferred.reject(401);
							}
						}, function() {
							deferred.reject(401);
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