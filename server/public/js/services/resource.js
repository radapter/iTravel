'use strict';

ResourceFactory.$inject = ['$q', '$http'];
angular.module('iTravel')
.factory('Resource', ResourceFactory);

// a base type that all other resources(e.g plan, activity etc) inherit from
function ResourceFactory() {

	function Resource() {};

	Resource.prototype.save = save;
	Resource.prototype.reqTransfrom = reqTransfrom;

	/**
	 * Save the resource to backend
	 * @return {promise} The saved resource as a promise
	 */
	function save() {
		var _this = this;
		var pk = _this.pk || 'id';
		var resourceName = _this.resourceName || pluralize(_this.constructor.name.toLowerCase());

		return $http({
			url: _this[pk] ? '/' + resourceName + '/' + this[pk] : '/' + resourceName,
			method: _this[pk] ? 'PUT' : 'POST',
			data: reqTransfrom(_this)
		}).then(function(res) {
			if (res.status < 400) {
				// update id for newly created Plan
				if ( !_this[pk] && res.data[pk] ) {
					_this[pk] = res.data[pk];
				}
				return _this; // as a promise
			} else {
				// TODO: handle errors here
			}
		});
	}

	/**
	 * Transfrom the data so it conforms backend API
	 * @param  {Resource} data A resource object on front end
	 * @return {object}        A object that conforms backend API
	 */
	function reqTransfrom(data) {
		return data;
	}

	return Resource;
}
