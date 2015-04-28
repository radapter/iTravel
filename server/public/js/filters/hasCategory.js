(function() {
    'use strict';

    angular.module("iTravelApp")
        .filter('hasCategory', function () {
            return function (venues, category) {

                //console.log(venues);
                //console.log("category is " + category);
                if(category == "All"){
                    //console.log("returning all");
                    return venues;
                }

                var filtered = [];
                for(var i = 0; i < venues.length; i++){
                    var hasCat = false;
                    var venue = venues[i];
                    for(var k= 0; k < venue.categories.length ; k++ ) {
                        if(venue.categories[k].name == category) {
                            hasCat = true;
                            //console.log(venue.categories[k].name);
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
})();


