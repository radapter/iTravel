(function() {
    'use strict';
    angular.module("iTravelApp")
        .filter('venueSectionFilter', function () {
            return function (venues, filterValue) {
                //if no venues
                if(!venues || !venues.length)
                    return [];

                var filtered = _.filter(venues, function(venue) {
                    return venue.section === filterValue;
                })

                return filtered;
            }
        });

})();


