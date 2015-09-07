'use strict';

loginModalFactory.$inject = ['$q', '$rootScope', '$modal'];
angular.module('iTravelApp').factory('loginModal', loginModalFactory);

function loginModalFactory($q, $rootScope, $modal) {
	return {
		'showModal': function() {
			var deferred = $q.defer();

			var modalInstance = $modal.open({
			  animation: true,
			  templateUrl: 'templates/loginModal.html',
			  controller: 'LoginModalCtrl'
			});

			modalInstance.result.then(function (user) {
				// TODO: handle signup case
				console.log('signin modal return succeeded');
				deferred.resolve(user); 
			}, function () {
				console.log('signin modal return failed');
				deferred.reject(); 
			});

			return deferred.promise;
		}
	};
}
