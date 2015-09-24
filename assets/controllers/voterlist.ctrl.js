app.controller('VoterListController', ['$scope', '$http', function($scope, $http){
    $scope.voters = [];
    $http.get('voters.json')
    .success(function(data){
        $scope.voters = data;
    })
    .error(function(err){
        console.log("Failed to fetch JSON data.");
    });
}]); 