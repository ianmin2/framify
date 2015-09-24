app.directive('sidebarLeft', function(){
	return{
		restrict: 'E',
		controller: 'SidenavLeftController',
		templateUrl: 'views/sidenav-left.html'
	}
});