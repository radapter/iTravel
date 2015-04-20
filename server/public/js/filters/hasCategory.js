'use strict';

angular.module("iTravelApp")
    .filter('hasCategory', function () {
        return function (venues, category) {

            if(category == "All") return venues;

            var filtered = [];
            for(var i = 0; i< venues.length; i++){

                var hasCat = false;

                var venue = venues[i];

                for(var j= 0; j<venue.categories.length ; j++ ) {
                    if(venue.categories[j].shortName == category) {
                        hasCat = true;
                        break;
                    }
                }

                if(hasCat){
                    filtered.push(venues[i]);
                }
            }
            return filtered;
        }
    });
