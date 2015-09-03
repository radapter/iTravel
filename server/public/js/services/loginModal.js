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

			modalInstance.result.then(function (result) {
				if (result) {
					deferred.resolve(true); 
				} else {
					deferred.reject();
				}

			}, function () {
				deferred.reject(); 
			});

			return deferred.promise;
		}
	};
}
