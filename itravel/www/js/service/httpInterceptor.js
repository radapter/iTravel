'use strict';

httpInterceptorFactory.$inject = ['$injector', '$q', '$location', 'Session'];
angular.module('iTravelApp.service.httpInterceptor', []).factory('httpInterceptor', httpInterceptorFactory);

function httpInterceptorFactory($injector, $q, $location, Session) { // use $injector instead of $http to avoid circular dependency
	var loginModal;
	return {
		/**
		 * Run before each $http request is sending out
		 * @param  {object} req Angular $http request object
		 * @return {object}     the same res object
		 */
		'request': function(req) {
			var token = Session.loadAccessToken();

			if (token) {
				req.headers['x-access-token'] = token;
			}

			return req;
		},

		/**
		 * Run after $http request return any response
		 * @param  {object} res Angular $http response object
		 * @return {object} 	the same res object
		 */
		'response': function(res) {
			var headers;

			// refresh token whenever there is one in response header
			if (res.status <400) {
				headers = res.headers();

				// detect token refresh
				if (headers['x-access-token']) {
					Session.setAccessToken(headers['x-access-token']);
				}
			}

			return res;
		},

		/**
		 * Run after $http request return any response that contains an error code
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
					console.log('401 error detected. redirect to login page for now.');
					$location.path("/login");
					deferred.reject(originalRes);
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