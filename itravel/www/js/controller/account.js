
angular.module('iTravelApp.controller.account', [])

.controller('AccountCtrl', function($scope, User) {

  console.log('load account ctrl');
  $scope.settings = {
    enableFriends: true
  };

  $scope.currentUser = User.currentUser;

  console.log($scope.currentUser);
});
