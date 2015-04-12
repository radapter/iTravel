angular.module('iTravelApp')
.controller('NavbarCtrl', ['$scope', '$location', function ($scope, $location) {
    
    $scope.$on('$routeChangeSuccess', function(evt) {
        console.log(evt);
        $scope.showStatus = ($location.$$path === "/") ? false : true;

        console.log('$scope.showStatus', $scope.showStatus);
    });

    //$scope.showStatus = false;

    // if($location.$$path === "/"){
    //     console.log("in /");
    //     $scope.showStatus = false;
    // } else {
    //     console.log("in else");
    //     $scope.showStatus = true;
    // }
    // console.log("status:"+$scope.showStatus);

    

}]);
