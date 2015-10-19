app.controller("SidenavLeftController", ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
	$scope.toggleSidenav = function(menuId){
        $mdSidenav(menuId).toggle();
    }
}]);