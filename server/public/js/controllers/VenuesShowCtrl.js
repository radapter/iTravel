(function() {
    'use strict';

    angular.module("iTravelApp")
        .controller("VenuesShowCtrl", function ($scope, Venue, $routeParams) {

            //request GET venue from venue service
            Venue.getDetails($routeParams.id)
                .then(function (data) {
                    console.log("get venue "+ $routeParams.id+ " success");
                    console.log(data);
                    $scope.venue = data;
                });
            
        });
})();

