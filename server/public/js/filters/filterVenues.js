'use strict';

angular.module("iTravelApp")
    .filter('filterVenues', function () {
        return function (venues, filterParams) {

            console.log(filterParams);

            if(filterParams == null) return venues;

            var filtered = [];

            for(var i = 0; i< venues.length; i++){
                var venue = venues[i];
                if(filterParams.name  && venue.name.toLowerCase().indexOf(filterParams.name.toLowerCase()) == -1) continue;
                if(filterParams.state && venue.location.state != filterParams.state) continue;
                filtered.push(venue);
            }
            return filtered;
        }
    });

