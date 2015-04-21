(function() {
    'use strict';

    angular.module("iTravelApp")
        .filter('hasCategory', function () {
            return function (venues, category) {

                if(category == "All") return venues;

                var filtered = [];
                for(var i = 0; i < venues.length; i++){
                    var venueByType = venues[i];
                    for(var j = 0; j < venueByType[j]; j++){
                        var hasCat = false;

                        var venue = venueByType[i];

                        for(var k= 0; k < venue.categories.length ; k++ ) {
                            if(venue.categories[k].shortName == category) {
                                hasCat = true;
                                console.log(venue.categories[k].shortName);
                                break;
                            }
                        }

                        if(hasCat){
                            filtered.push(venueByType[i]);
                        }
                    }
                }
                return filtered;
            }
        });
})();


