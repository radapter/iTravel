'use strict';

signupModalFactory.$inject = ['$q', '$rootScope', '$modal'];
angular.module('iTravelApp').factory('signupModal', signupModalFactory);

function signupModalFactory($q, $rootScope, $modal) {
	return {
		'showModal': function() {
			var deferred = $q.defer();

			var modalInstance = $modal.open({
			  animation: true,
			  templateUrl: 'templates/signupModal.html',
			  controller: 'SignupModalCtrl'
			});

			modalInstance.result.then(function (user) {
				console.log('signup modal return succeeded');
				deferred.resolve(user); 
			}, function () {
				console.log('signup modal return failed');
				deferred.reject(); 
			});

			return deferred.promise;
		}
	};
}
