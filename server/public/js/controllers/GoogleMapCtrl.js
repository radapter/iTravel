(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('GoogleMapCtrl', function ($scope, uiGmapGoogleMapApi) {
            // Do stuff with your $scope.
            // Note: Some of the directives require at least something to be defined originally!
            // e.g. $scope.markers = []

            $scope.map = {
                center: { latitude: 37.3483411, longitude: -121.9160468},
                options:{
                    //disableDefaultUI: true,
                    scrollwheel: false,
                    //scaleControl: false,
                    //panControl: false,
                    //navigationControl: false,
                    //draggable: false,
                    mapTypeControl: true
                },
                zoom: 14
            };
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: 37.3483411,
                    longitude: -121.9160468
                },
                options: { draggable: true },
                events: {
                    dragend: function (marker, eventName, args) {
                        $log.log('marker dragend');
                        var lat = marker.getPosition().lat();
                        var lon = marker.getPosition().lng();
                        $log.log(lat);
                        $log.log(lon);

                        $scope.marker.options = {
                            draggable: true,
                            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                            labelAnchor: "100 0",
                            labelClass: "marker-labels"
                        };
                    }
                }
            };

            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            uiGmapGoogleMapApi.then(function(maps) {

            });
        });
})();


