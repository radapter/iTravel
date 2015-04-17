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
		logout: logout
	};

	// static properties/methods
	User.currentUser = null;
	User.login = login;
	User.signup = signup;

	function login(username, password) {
		/*
		backend implementation needed
		 */
		$http.get('/user/login', {
			cache: false,
			params: {
				username: username,
				password: password
			}
		}).then(function(res) {
			if (res.data.success) {
				User.currentUser = new User(res.data.user);

				// TODO: populate other models

				$rootScope.$broadcast('userLoginSuccess', User.currentUser);
			}
		});
	}

	function logout() {
		/*
		backend implementation needed
		 */
		$http.get('/user/logout', {
			cache: false
		}).then(function(res) {
			if (res.data.success) {
				User.currentUser = null;

				$rootScope.$broadcast('userLogout');
			}
		});
	}

	function signup(username, email, password) {
		/*
		backend implementation needed
		 */
		$http.post('/user/signup', {
			username: username,
			email: email,
			password: password
		}).then(function(res) {
			if (res.data.success) {
				User.currentUser = new User(res.data.user);

				// TODO: populate other models

				$rootScope.$broadcast('userLoginSuccess', User.currentUser);
			}
		});
	}

	return User;
}