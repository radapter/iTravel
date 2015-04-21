(function() {
    'use strict';

    angular.module("iTravelApp")
        .filter('filterVenues', function () {
            return function (venues, filterParams) {
                if(!venues || !venues.length) return;


                //console.log(venues);

                if(filterParams == null) return venues;

                console.log(filterParams);
                var filtered = [];

                //console.log(venues.length);

                for(var i = 0; i < venues.length; i++){
                    var venue = venues[i];
                    //console.log(venue);
                    if(filterParams.name  && venue.name.toLowerCase().indexOf(filterParams.name.toLowerCase()) == -1) continue;
                    //if(filterParams.state && venue.location.state != filterParams.state) continue;
                    filtered.push(venue);
                }
                return filtered;
            }
        });

})();


