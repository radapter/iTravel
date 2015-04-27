(function() {
    'use strict';

    angular.module('iTravelApp')
        .controller('PlansShowCtrl', ['$scope', '$routeParams', '$location', 'User', '$rootScope', function($scope, $routeParams, $location, User, $rootScope) {

            //retrieve user & plan
            User.restore()
                .then(function () {
                    if(User.currentUser) {
                        $scope.user = User.currentUser;
                        console.log($scope.user);

                        var planid = $routeParams.id;
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
                });





        }]);



})();
