app.controller('framifySampleController', ['$scope', '$http', function($scope, $http){
   
    $scope.voters = [];
        
    var voteSet = function(data){
        $scope.voters = data;
    };
    
    var voteFail = function(err){
        $scope.app.alert( $scope.app.title, "Failed to fetch JSON data.", $scope.app.doNothing);
    };
    
    $scope.customify = function( data ){
        $scope.app.alert( ($scope.nav.alias || $scope.nav.title)  , "<center>DONE!</center>", $scope.app.doNothing );
    }
    
    $scope.sav = function(){
        $scope.app.confirm(($scope.nav.alias || $scope.nav.title), 'Do you really want to save this widget', $scope.customify )
    }
    
    $scope.del = function(){
        $scope.app.confirm( ($scope.nav.alias || $scope.nav.title), 'Are you sure you want to DELETE this widget', $scope.customify)
    }   
    
    $scope.app.getJSON('./sample/sample.json', voteSet );
    x    
    $scope.testify = function(){
        return "Correct!!";
    }
    
    
}]); 