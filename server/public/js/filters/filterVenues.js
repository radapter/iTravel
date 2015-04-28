(function() {
    'use strict';
    angular.module("iTravelApp")
        .filter('filterVenues', function () {
            return function (venues, filterParams) {
                //if no venues
                if(!venues || !venues.length)
                    return;

                //add property values to venues to alleviate sorting problems
                var firstPass = [];
                for(var i = 0; i < venues.length; i++){
                    var venue = venues[i];
                    //if venue does not have price, give it price tier of 0 to sort to bottom
                    if(!venue.hasOwnProperty('price')){
                        venue["price"] = {"tier": 0};
                    }
                    //if venue does not have rating, give it -1 to sort to bottom
                    if(!venue.rating){
                        venue.rating = -1;
                    }
                    firstPass.push(venue);
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


