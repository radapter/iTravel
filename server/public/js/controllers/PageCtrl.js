'use strict';

angular.module('iTravelApp').controller('PageCtrl', ['$scope', '$location', function ($scope, $location) {
    console.log("Page Controller reporting for duty..");
    console.log($location.$$path);
}]);
