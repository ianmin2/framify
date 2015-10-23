app.controller('framifySampleController', ['$scope', '$http', function($scope, $http){
   
    $scope.voters = [];
        
    var voteSet = function(data){
        $scope.voters = data;
    };
    
    var voteFail = function(err){
        alert("Failed to fetch JSON data.");
    };
    
    $scope.customify = function( data ){
        $scope.app.alert("Framify Child", "<center>DONE!</center>", "continue");
    }
    
    $scope.sav = function(){
        $scope.app.confirm('Framify Child', 'Do you really want to save this widget', $scope.customify, $scope.customify )
    }
    
    $scope.del = function(){
        $scope.app.confirm('Framify Child', 'Are you sure you want to DELETE this widget', $scope.customify, $scope.customify )
    }   
    
    
    $scope.app.ajax('/sample/sample.json', '', voteSet, voteFail );
    
    
    $scope.testify = function(){
        return "Correct!!";
    }
    
    
}]); 