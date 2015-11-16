
angular.module("iTravelApp.filter.trimString", [])
    .filter('trimString', function () {
        //function to trim string
        return function (name) {
            console.log(name.replace(/\s+/g, ''));
            return name.replace(/\s+/g, '');
        }
    });


