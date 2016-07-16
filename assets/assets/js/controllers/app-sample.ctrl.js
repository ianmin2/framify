app.controller('framifySampleController', ['$scope', '$http', function($scope, $http){
   
    $scope.voters = [];
        
    var voteSet = function(data){
        console.log("SETTING VOTERS")
        $scope.voters = data;
    };
    
    var voteFail = function(err){
        $scope.app.alert( $scope.app.title, "Failed to fetch JSON data.", $scope.app.doNothing);
    };
    
    $scope.customify = function( data ){
        $scope.app.alert( ($scope.nav.alias || $scope.nav.title)  , "<center>DONE!</center>", $scope.app.doNothing );
    };
    
    $scope.sav = function(){
        $scope.app.confirm(($scope.nav.alias || $scope.nav.title), 'Do you really want to save this widget', $scope.customify );
    };
    
    $scope.del = function(){
        $scope.app.confirm( ($scope.nav.alias || $scope.nav.title), 'Are you sure you want to DELETE this widget', $scope.customify);
    };   
    
    $scope.app.getJSON('./sample/sample.json', voteSet );
    
    $scope.testify = function(){
        return "Correct!!";
    };

    /** CHARTS */
    	  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [28, 48, 40, 19, 86, 27, 90]
	  ];
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };
	  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	  $scope.options = {
	    scales: {
	      yAxes: [
		{
		  id: 'y-axis-1',
		  type: 'linear',
		  display: true,
		  position: 'left'
		},
		{
		  id: 'y-axis-2',
		  type: 'linear',
		  display: true,
		  position: 'right'
		}
	      ]
	    }
	  };
    
    
}]); 
