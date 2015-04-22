(function() {
    'use strict';
    angular.module("iTravelApp")
        .filter('filterVenues', function () {
            return function (venues, filterParams) {
                //if no venues
                if(!venues || !venues.length)
                    return;

                //remove venues with no ratings - otherwise it messes up sorting
                var firstPass = [];
                for(var i = 0; i < venues.length; i++){
                    var venue = venues[i];
                    if(venue.rating){
                        firstPass.push(venue);
                    }
                }

                //if there are no filterParams
                if(filterParams == null)
                    return firstPass;

                console.log(filterParams);

                //if there are filters, continue with filter process
                var filtered = [];
                for(var i = 0; i < venues.length; i++){
                    var venue = venues[i];
                    if(filterParams.name  && venue.name.toLowerCase().indexOf(filterParams.name.toLowerCase()) == -1)
                        continue;
                    //additional filtering here
                    filtered.push(venue);
                }
                return filtered;
            }
        });

})();


