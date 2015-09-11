(function() {
    'use strict';
    angular.module("iTravelApp")
        .filter('numberToAlphabet', function () {
            return function (num) {
                console.log(num);
                var chr = String.fromCharCode(65 + num); // where num is 0, 1, 2 ...
                return chr;
            }
        });

})();

