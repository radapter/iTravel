
angular.module("iTravelApp.filter.getDestNameInitial", [])
    .filter('getDestNameInitial', function () {
        //function to get street or city name first 2 initials
        return function (name) {
            //console.log(name);
            var words = name.split(" ");
            var i = 0;
            while(!isNaN(parseInt(words[i].charAt(0))) || words[i].length === 1) {
                i++;
            }
            var initial = words[i].charAt(0) + words[i+1].charAt(0);
            return initial.toUpperCase();
        }
    });


