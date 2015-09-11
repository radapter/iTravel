
angular.module('iTravelApp.controller.login', [])

    .controller('LoginCtrl', function($scope, $location, User) {
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
                    if(res.status == 200) {
                        $scope.loginStat = true;
                        console.log('user logged in successfully');
                        $location.path("/tab/home");
                    } else {
                        console.log('user login failed. res:', res.data);
                        $scope.loginStat = false;
                        $scope.uiModel = {
                            email: '',
                            password: ''
                        };
                    }
                });
        };
    });
