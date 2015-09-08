'use strict';

loginModalFactory.$inject = ['$q', '$rootScope', '$modal', '$location'];
angular.module('iTravelApp').factory('loginModal', loginModalFactory);

function loginModalFactory($q, $rootScope, $modal, $location) {
	return {
		'showModal': function() {
			var modalInstance = $modal.open({
			  animation: true,
			  templateUrl: 'templates/loginModal.html',
			  controller: 'LoginModalCtrl'
			});

			return modalInstance.result.then(function (res) {
				if (typeof res === 'string' && res === 'signup') {
					// user want to singup instead of login; delegate signup modal to handle this
					console.log('user choose to signup');
					$location.url('/signup');
					return $q.reject('signup');
				} else {
					console.log('login modal return succeeded');
					return res; 
				}
			}, function () {
				console.log('user canceled login');
				return $q.reject('canceled'); 
			});
		}
	};
}
