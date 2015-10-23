app.controller('VoterListController', ['$scope', '$http', function($scope, $http){
    $scope.voters = [];
    
    
    var voteSet = function(data){
        $scope.voters = data;
        alert("Fetched");
    };
    
    var voteFail = function(err){
        alert("Failed to fetch JSON data.");
    };
    
    $scope.app.cors('voters.json', '', voteSet, voteFail );
    
    
}]); 