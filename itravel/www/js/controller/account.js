
angular.module('iTravelApp.controller.account', [])

.controller('AccountCtrl', function($scope, $state, $rootScope, $location, User, $ionicModal) {

  console.log('load account ctrl');

  if(User.currentUser) {
      $scope.currentUser = User.currentUser;
  } else {
      $state.go('login');
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
                    $state.go("login");
                } else {
                    console.log('user logout failed. res:', res.data);
                }
            });
    }

  };


  $ionicModal.fromTemplateUrl('templates/help.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.helpModal = modal;
  });

});
