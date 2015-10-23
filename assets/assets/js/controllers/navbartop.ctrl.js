app.controller("NavbarTopController", ['$scope', '$http', function($scope, $http){
    
    $scope.nav = [];

    $scope.setRoute = function( i ){
        alert( i )
    }

    var setNav = function(data){
        $scope.nav = data;
        //console.dir( $scope.nav )
    }
    
    var setLinks = function(data){
        $scope.links = data;
        //console.dir($scope.links)
    }
    
    var failNav = function( errData ){
        console.log( errData )
        alert("FailNav")
    }
    
    var failLinks = function( errData ){
        console.log( errData )
        alert("failLinks")
    }
      
     $scope.app.cors('config/app.json', '', setNav, failNav );
     $scope.app.cors('./config/app-routes.json', '', setLinks, failLinks );
    
    
    
    
        
}]);