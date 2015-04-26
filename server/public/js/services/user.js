(function() {
	'use strict';

	UserFactory.$inject = ['$http', '$q', '$rootScope', 'Plan', 'Activity', 'Venue'];
	angular.module('iTravelApp').factory('User', UserFactory);

	function UserFactory($http, $q, $rootScope, Plan, Activity, Venue) {
		
		// constructor
		function User(config) {
			angular.extend(this, config);

			this.plans = _.map(this.plans, function(plan) {
				return new Plan(plan);
			});
		}

		// instance properties/methods
		User.prototype = {
			logout: logout,
			save: save,
			refresh: refresh
		};

		// static properties/methods
		User.currentUser = null;
		User.redirectTo = null;
		User.login = login;
		User.signup = signup;
		User.restore = restore;

		function save() {
			var _this = this;

			// prevent user change id and email
			var requestBody = _.omit(_this, ['_id', 'email']);

			return $http({
				url: '/api/v1/users/' + _this._id,
				method: 'PUT',
				data: requestBody
			});
		}

		function refresh() {
			var _this = this;


			return $http({
				url: '/api/v1/users/' + _this._id,
				method: 'GET',
			}).then(function(res) {
				if (res.status === 200) {
					populateData(res.data);

					// TODO: populate other models
					$rootScope.$broadcast('userRefreshSuccess', User.currentUser);
				}
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
			var deferred = $q.defer();

			if (User.currentUser) {
				return $q.when(User.currentUser);
			}

			$http({
				url: '/restore',
				method: 'POST'
			}).then(function(res) {
				if (res.status === 200) {
					populateData(res.data);

					// TODO: populate other models
					$rootScope.$broadcast('userLoginSuccess', User.currentUser);
					deferred.resolve(User.currentUser);
				}
			}, function() {
				console.log('no user can be restored, fail block called');
				deferred.reject('error');
			});

			return deferred.promise;
		}

		function populateData(data) {
			console.log('user raw data', data);
			User.currentUser = new User(data);
			console.log('user populated data', User.currentUser);
			// TODO: populate other models
		}

		return User;
	}
})();