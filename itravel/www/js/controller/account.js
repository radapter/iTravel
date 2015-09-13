
angular.module('iTravelApp.controller.account', [])

.controller('AccountCtrl', function($scope, $rootScope, $location, User) {

  console.log('load account ctrl');

  $scope.currentUser = User.currentUser;

  $rootScope.$on('userLoginSuccess', function (event, data) {
      console.log(data);
      $scope.currentUser = data;
  });
        
  $scope.logout = function () {
    if(User.currentUser) {
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
    }

  };
});
