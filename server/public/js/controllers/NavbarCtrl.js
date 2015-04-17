angular.module('iTravelApp')
.controller('NavbarCtrl', ['$scope', '$location', function ($scope, $location) {
    
    $scope.$on('$routeChangeSuccess', function(evt) {
        $scope.showStatus = ($location.$$path === "/") ? true : false;
    });

}]);
