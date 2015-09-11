(function() {
	//'use strict';

	UserFactory.$inject = ['$http', '$q', '$rootScope', 'Plan', 'Activity', 'Venue', 'host', '_'];
	angular.module('iTravelApp.service.user', []).factory('User', UserFactory);

	function UserFactory($http, $q, $rootScope, Plan, Activity, Venue, host, _) {
		
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
			refresh: refresh,
			getStat: getStat
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
				url: host + 'api/v1/users/' + _this._id,
				method: 'PUT',
				data: requestBody
			});
		}

		function refresh() {
			var _this = this;


			return $http({
				url: host + 'api/v1/users/' + _this._id,
				method: 'GET'
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
				url: host+ 'login',
				method: 'POST',
				cache: false,
				data: {
					email: email,
					password: password
				}
			}).then(function succeed(res) {
				populateData(res.data);
				$rootScope.$broadcast('userLoginSuccess', User.currentUser);
				return User.currentUser;
			}, function fail(err) {
				console.log('login failed');
				return err;
			});
		}

		function logout() {
			/*
			backend implementation needed
			 */
			return $http({
				url: host + 'logout',
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
				url: host+ 'signup',
				method: 'POST',
				data: {
					email: email,
					password: password
				}
			}).then(function succeed(res) {
				populateData(res.data);
				$rootScope.$broadcast('userLoginSuccess', User.currentUser);
				return User.currentUser;
			}, function fail(err) {
				console.log('signup failed');
				return err;
			});
		}

		function restore(initRun) {
			var deferred = $q.defer();

			if (User.currentUser) {
				return $q.when(User.currentUser);
			}

			$http({
				url: host + 'restore',
				method: 'POST',
				nointercept: initRun ? true : false // if restore is called when app initiates, don't intercept 401 error
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

		function getStat() {
			var stat = {
				venueCategories: [],
				destinations: []
			};

			_.each(this.plans, function(plan) {
				// console.log('plan', plan);

				_.each(plan.activities, function(activity) {
					// _.each(activity.venue.categories, function(category) {

					// });
					var category = activity.venue.categories[1];
					if (category) {
						var CurrCat = _.findWhere(stat.venueCategories, {label: category.name});
						if (CurrCat) {
							CurrCat.value++;
						} else {
							stat.venueCategories.push({label: category.name, value:1});
						}
					}

					var destination = activity.venue.location.city;
					var currDest = _.findWhere(stat.destinations, {key: destination});
					if (currDest) {
						currDest.values[0][1]++;
					} else {
						stat.destinations.push({key: destination, values:[[destination, 1]]});
					}

				});
			});

			stat.venueCategories = _.sortBy(stat.venueCategories, function(obj) {
				return -obj.value;
			}).slice(0,10);

			stat.destinations = _.sortBy(stat.destinations, function(obj) {
				return -obj.values[0][1];
			}).slice(0,10);

			return stat;

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