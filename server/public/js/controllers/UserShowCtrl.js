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

                        //if redirected from save plan page -- plan saved in local storage
                        if(localStorage.length){
                            var restore = confirm("You have a saved plan in local storage. " +
                                "Restoring now. NOTE: If you click 'cancel', you will discard that plan.");
                            if(restore){
                                console.log("there are items in local storage. need to restore plan");
                                var restorePlan = {};
                                for (var i = 0; i < localStorage.length; i++){
                                    var key = localStorage.key(i);
                                    var lSItem = localStorage.getItem(localStorage.key(i));
                                    var jsonItem = JSON.parse(lSItem);
                                    restorePlan[key] = jsonItem;
                                    //console.log(restorePlan);
                                }
                                console.log(restorePlan);

                                User.currentUser.plans.push(restorePlan);

                                User.currentUser.save()
                                    .then(_.bind(User.currentUser.refresh, User.currentUser))
                                    .then(function() {
                                        console.log('user info saved. User:', User.currentUser);
                                        // console.log('new plan ts:', Plan.tempPlan.signatureTs);

                                        var newPlan = _.findWhere(User.currentUser.plans, {signatureTs: restorePlan.signatureTs});
                                        // console.log('new plan found:', newPlan);

                                        console.log("going to restored plan");
                                        $location.url('plans/'+newPlan._id);
                                        localStorage.clear();

                                    }, function(err){
                                        console.log('network err', err);
                                    });
                            }
                            else{
                                localStorage.clear();
                            }
                        }//end local storage restore


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
