
angular.module('iTravelApp.controller.account', [])

.controller('AccountCtrl', function($scope, $location, User) {

  console.log('load account ctrl');
  $scope.settings = {
    enableFriends: true
  };

  $scope.currentUser = User.currentUser;

  console.log($scope.currentUser);

  $scope.logout = function () {
    User.currentUser.logout()
        .then(function(res) {

           console.log(res);
           if(res.status == 200) {
             console.log('user logged out successfully');
             $location.path("/login");
           } else {
             console.log('user logout failed. res:', res.data);
           }

        });
  };
});
