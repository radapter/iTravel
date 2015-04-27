(function() {
    'use strict';

    angular.module("iTravelApp")
        .controller("VenuesShowCtrl", [ '$scope', 'Venue', '$routeParams', '$rootScope', function ($scope, Venue, $routeParams, $rootScope) {

            //request GET venue from venue service
            Venue.getDetails($routeParams.id)
                .then(function (data) {
                    console.log("get venue "+ $routeParams.id+ " success");
                    console.log(data);
                    $scope.venue = data;
                    $rootScope.$broadcast('venueLoaded');
                });
            
        }]);
})();

