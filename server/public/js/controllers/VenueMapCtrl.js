(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('VenueMapCtrl', ['$scope', 'uiGmapGoogleMapApi', '$rootScope', function ($scope, uiGmapGoogleMapApi, $rootScope) {

            $rootScope.$on('venueLoaded', function () {
                $scope.venue = $scope.$parent.venue;
                console.log($scope.venue);

                $scope.map = {
                    center: { latitude: $scope.venue.location.lat, longitude: $scope.venue.location.lng},
                    options:{
                        //disableDefaultUI: true,
                        scrollwheel: false,
                        //scaleControl: false,
                        //panControl: false,
                        //navigationControl: false,
                        //draggable: false,
                        mapTypeControl: true
                    },
                    zoom: 15
                };
                $scope.marker = {
                    id: 0,
                    coords: {
                        latitude: $scope.venue.location.lat,
                        longitude: $scope.venue.location.lng
                    },
                    options: {},
                    events: {}
                };

            });



            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            //uiGmapGoogleMapApi.then(function(maps) {
            //
            //});
        }]);
})();


