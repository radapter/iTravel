
angular.module('iTravelApp.controller.planDetail', [])

    .controller('PlanDetailCtrl', function($scope, User, $rootScope, $stateParams) {
        init();

        function init() {
            if(User.currentUser) {
                $scope.user = User.currentUser;
                console.log($scope.user);

                var planid = $stateParams.id;
                var plans = $scope.user.plans;
                for(var i = 0; i< plans.length; i++){
                    //console.log(plans[i]);
                    if(plans[i]._id == planid) {
                        $scope.plan = plans[i];
                        //console.log($scope.plan);
                        $rootScope.$broadcast('planLoaded');
                    }
                }
            }
        }
    });

