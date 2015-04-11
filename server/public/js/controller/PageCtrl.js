app.controller('PageCtrl', function ($scope, $location, $http ) {
    console.log("Page Controller reporting for duty..");
    console.log($location.$$path);


    //$scope.showStatus = false;

    if($location.$$path === "/"){
        console.log("in /");
        $scope.showStatus = false;
    } else {
        console.log("in else");
        $scope.showStatus = true;
    }
    console.log("status:"+$scope.showStatus);

});
