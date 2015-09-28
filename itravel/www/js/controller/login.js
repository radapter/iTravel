
angular.module('iTravelApp.controller.login', [])

    .controller('LoginCtrl', function($scope, $state, $location, User) {

        console.log('LoginCtrl loaded');

        if(User.currentUser) {
          $state.go('tab.home');
        }

        $scope.uiModel = {
            email: '',
            password: ''
        };

        $scope.loginStat = true;

        $scope.login = function() {
            var email = $scope.uiModel.email;
            var password = $scope.uiModel.password;

            User.login(email, password)
                .then(function(res) {
                    console.log(res);
                    if(res.status) {
                        console.log('user login failed. res:', res.data);
                        $scope.loginStat = false;
                        $scope.uiModel = {
                            email: '',
                            password: ''
                        };
                    } else {
                        $scope.loginStat = true;
                        console.log('user logged in successfully');
                        console.log(User.currentUser);
                        $state.go('tab.home');
                    }
                });
        };
    });
