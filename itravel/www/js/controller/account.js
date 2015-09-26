
angular.module('iTravelApp.controller.account', [])

.controller('AccountCtrl', function($scope, $rootScope, $location, User) {

  console.log('load account ctrl');

  if(User.currentUser) {
      $scope.currentUser = User.currentUser;
  } else {
      $location.path('/login');
  }

  $rootScope.$on('userLoginSuccess', function (event, data) {
      console.log(data);
      $scope.currentUser = data;
      console.log($scope.currentUser);
      console.log(User.currentUser);
      //User.currentUser = $scope.currentUser;
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
