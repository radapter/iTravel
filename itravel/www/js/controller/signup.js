
angular.module('iTravelApp.controller.signup', [])

    .controller('SignupCtrl', function($scope,$location, User) {
        $scope.uiModel = {
            email: '',
            password: '',
            passwordConf: ''
        };

        $scope.signupStat = true;
        $scope.pwMatch = true;

        $scope.signup = function() {
            var email = $scope.uiModel.email;
            var password = $scope.uiModel.password;
            var passwordConf = $scope.uiModel.passwordConf;

            if(password !== passwordConf) {
                $scope.pwMatch = false;
                // show alert for now, need more sophisticated notification
                //alert('Password not match!');
            }
            else{
                User.signup(email, password)
                    .then(function(res) {
                        console.log(res);

                        //if error format {status:500,....}
                        if(res.status) {
                            $scope.signupStat = false;
                            console.log('user signup failed. res:', res.data.message);
                            $scope.uiModel = {
                                email: '',
                                password: '',
                                passwordConf: ''
                            };
                        } else {
                            //if success, res = user
                            console.log('user signed up successfully');
                            $scope.signupStat = true;
                            $scope.pwMatch = true;
                            console.log(User.currentUser);
                            $state.go("tab.home");
                        }
                    });
            }


        };
    });
