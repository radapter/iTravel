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

	function save() {
		var pk = '_id';
		var resourceName = 'users';

		return $http({
			url: '/api/v1/' + resourceName + '/' + this[pk],
			method: 'PUT',
			data: this
		});
	}

	function login(email, password) {
		/*
		backend implementation needed
		 */
		return $http.post('/login', {
			cache: false,
			params: {
				email: email,
				password: password
			}
		}).then(function(res) {
			if (res.status === 200) {
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
		return $http.get('/user/logout', {
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
		return $http.post('/signup', {
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