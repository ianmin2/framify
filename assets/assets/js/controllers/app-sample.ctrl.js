app.controller('framifySampleController', ['$scope', '$http', function($scope, $http){
   
    $scope.voters = [];
        
    var voteSet = function(data){
        $scope.voters = data;
    };
    
    var voteFail = function(err){
        alert("Failed to fetch JSON data.");
    };
    
    $scope.customify = function( data ){
        $scope.app.alert( $scope.nav.title, "<center>DONE!</center>", $scope.app.doNothing );
    }
    
    $scope.sav = function(){
        $scope.app.confirm( $scope.nav.title, 'Do you really want to save this widget', $scope.customify, $scope.customify )
    }
    
    $scope.del = function(){
        $scope.app.confirm( $scope.nav.title, 'Are you sure you want to DELETE this widget', $scope.customify, $scope.customify )
    }   
    
    $scope.app.getJSON('./sample/sample.json', voteSet );
    
    
    
    $scope.testify = function(){
        return "Correct!!";
    }
    
    
}]); 