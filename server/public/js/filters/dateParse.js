(function() {
    'use strict';
    angular.module("iTravelApp")
        .filter('dateParse', function () {
            return function (date) {
                console.log(date);
                //console.log(date.getHours());
                var parseDate = Date.parse(date);
                return parseDate;
            }
        });

})();

