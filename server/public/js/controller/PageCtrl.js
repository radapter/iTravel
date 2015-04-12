angular.module('iTravelApp').controller('PageCtrl', function ($scope, $location, $http ) {
    console.log("Page Controller reporting for duty..");
    console.log($location.$$path);
});
