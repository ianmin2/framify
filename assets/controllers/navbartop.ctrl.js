app.controller("NavbarTopController", ['$scope', '$http', function($scope, $http){
		$scope.nav = [];
		$http.get("config/navbar.json")
			.success(function(data){
				$scope.nav = data; 
				console.log("Successfully captured navbar data.");
			})
			.success(function(){
				console.log("Failed to capture navbar data.");
			})
}]);