(function() {
	'use strict';

	UserFactory.$inject = ['$http', '$q', '$rootScope'];
	angular.module('iTravelApp').factory('User', UserFactory);

	function UserFactory($http, $q, $rootScope) {
		
		// constructor
		function User(config) {
			angular.extend(this, config);
		}

		// instance properties/methods
		User.prototype = {
			logout: logout,
			save: save
		};

		// static properties/methods
		User.currentUser = null;
		User.login = login;
		User.signup = signup;
		User.restore = restore;

		function save() {
			var pk = '_id';
			var resourceName = 'users';

			// prevent user change id and email
			var requestBody = _.omit(this, ['_id', 'email']);

			return $http({
				url: '/api/v1/' + resourceName + '/' + this[pk],
				method: 'PUT',
				data: requestBody
			});
		}

		function login(email, password) {
			/*
			backend implementation needed
			 */
			return $http({
				url: '/login',
				method: 'POST',
				cache: false,
				data: {
					email: email,
					password: password
				}
			}).then(function(res) {
				if (res.status === 200) {
					populateData(res.data);
					$rootScope.$broadcast('userLoginSuccess', User.currentUser);
				}
			});
		}

		function logout() {
			/*
			backend implementation needed
			 */
			return $http({
				url: '/logout', 
				method: 'POST'
			}).then(function(res) {
				if (res.status === 200) {
					User.currentUser = null;

					$rootScope.$broadcast('userLogout');
				}
			});
		}

		function signup(email, password) {
			/*
			backend implementation needed
			 */
			return $http({
				url: '/signup',
				method: 'POST',
				data: {
					email: email,
					password: password
				}
			}).then(function(res) {
				if (res.status === 200) {
					populateData(res.data);
					$rootScope.$broadcast('userLoginSuccess', User.currentUser);
				}
			});
		}

		function restore() {
			return $http({
				url: '/restore',
				method: 'POST'
			}).then(function(res) {
				if (res.status === 200) {
					populateData(res.data);

					// TODO: populate other models
					$rootScope.$broadcast('userLoginSuccess', User.currentUser);
				}
			}, function() {
				console.log('no user can be restored, fail block called');
			});
		}

		function populateData(data) {
			User.currentUser = new User(data);

			// TODO: populate other models
		}

		return User;
	}
})();