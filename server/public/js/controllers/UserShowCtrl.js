(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('UserShowCtrl', ['$scope', '$location', 'User', function($scope, $location, User) {

            //retrieve user
            User.restore()
                .then(function () {
                    if(User.currentUser) {
                        $scope.user = User.currentUser;
                        console.log($scope.user);

                        $scope.planCount = $scope.user.plans.length;
                        $scope.activityCount = countActivities($scope.user);
                        $scope.destinationCount = countDestinations($scope.user);
                    }
                });


            $scope.gotoPlan = function (_id) {
                console.log(_id);
                $location.url("/plans/"+_id);
            }

        }]);

    function countActivities(user) {
        if(!user) return 0;
        var activityCount = 0;
        for(var i=0; i< user.plans.length; i++){
            activityCount += user.plans[i].activities.length;
        }
        return activityCount;
    }

    function countDestinations(user) {
        if(!user) return 0;
        var destinations = [];
        for(var i=0; i< user.plans.length; i++){
            if(!_.contains(destinations, user.plans[i].destName) ) {
                destinations.push(user.plans[i].destName);
            }
        }
        return destinations.length;
    }
    
})();
