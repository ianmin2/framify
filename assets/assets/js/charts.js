var chartApp = angular.module("chartGenerator",['ionic','highcharts-ng'])
chartApp.controller("chartController",['$scope',function($scope){

	

	$scope.url = window.location.href.split('/').filter(function(urlPortion){ return ( urlPortion != '' && urlPortion != 'http:' && urlPortion !=  'https:'  )  }) ;
	var ip = $scope.url[0];
	
	$scope.minHeight = window.innerHeight;
	$scope.minWidth	 = window.innerWidth;
	$scope.pTop	= ((window.innerHeight - 400 )/2)
	
	
	$scope.$on('resize', function () {
		$scope.minHeight = window.innerHeight;
		$scope.minWidth	 = window.innerWidth;
	});

	//! THE RESOURCE FETCHING FUNCTION
	$scope.fetchData = function(resourceFile){
		 return $.ajax({
			method: "GET",
			url: `http://${ip}/data/${resourceFile}`			  
		 })
	};
	
	$scope.chartType = 'bar';
	
	$scope.setType = function(chartType){
		$scope.chartType = chartType;
		$scope.drawCharts();
	}
	
	//! THE BASIC CHART CONTAINER ARRAY
	$scope.chartContainers = [];
	
	//! SETUP THE BASIC CHART DATA OBJECT ARRAY
	$scope.chartData = {};
	$scope.results = {};
	$scope.charts  = {};
	
	$scope.scroll = () => {
		
		$scope.positions = [];
		
		$scope.chartData.all_positions.foreach( function( chartData,ChartId ){
			$scope.positions.push(ChartId);
		})
		
        var timer_max = $scope.positions.length - 1;
        var timer_pos = 0;
        
        var timed = setInterval(function(){
        
           if( timer_pos < timer_max ){
           
               //FOCUS THE DISPLAY ONTO THE CHOICE ELEMENT
               $( `#${$scope.positions[timer_pos]}` ).fadeIn(1000);
               document.getElementById($scope.positions[timer_pos]).scrollIntoView()
               setTimeout(function(){
                    $(`#${$scope.positions[timer_pos]}`).fadeOut(1000);
               },14000);
               
               //PREPARE THE POSITION COUNTER FOR THE NEXT POSITION
               timer_pos += 1;
           
           }else{
           
               //FOCUS THE DISPLAY ONTO THE CHOICE ELEMENT
				$( `#${$scope.positions[timer_pos]}` ).fadeIn(1000);
				document.getElementById($scope.positions[timer_pos]).scrollIntoView()
				setTimeout(function(){
						$(`#${$scope.positions[timer_pos]}`).fadeOut(1000);
				},14000);
               
               //RE-INITIALIZE THE POSITION COUNTER
                timer_pos = 0;
               
           }
        
        }, 15000);
        
    };
	
	//! FETCH THE BASIC RESOURCES AND STASH THEM IN AN ARRAY	
	["all_candidates.json","all_positions.json"].forEach( function( fileName, filePosition ){
		
		$scope.fetchData( fileName )
		.then(function(d){
			
			//@ FILL UP THE LOCAL CHARTDATA OBJECT			
			$scope.chartData[ fileName.replace(/\.json/ig, "") ] = d;
			//$scope.$apply();
			
			//@ OPTIONALLY POPULATE THE PAGE WITH THE REQUIRED POSITION CONTAINERS
			if( fileName.replace(/\.json/ig, "") === "all_positions" ){
				
				d.foreach( function( positionTitle, positionId ){
					
					$scope.chartContainers.push( positionId );
					
				});
				
			}
			
		});
		
	});
	
	
	//@ THE CHART DRAWING ENGINE
	$scope.drawCharts = function(){
		
		$scope.results = {};
		$scope.charts  = {};
		var charts	   = [];
		//@ ITERATE THROUGH EACH VOTE POSITION
		$scope.chartData['votes'].foreach( function(voteData,votePosition){
			
			$scope.results[votePosition] = {};
			charts[votePosition]  = [];
			
			//@ ITERATE THROUGH AND TRANSLATE EACH VOTE
			voteData.forEach(function( voteValue,voteNumber){
				
				$scope.results[votePosition][voteValue] = ( $scope.results[votePosition][voteValue] ) ? $scope.results[votePosition][voteValue] += 1 : 1;
				//$scope.$apply()
				
			});
			
			//@ LOAD THE DATA INTO AN ORDERED ARRAY 
				//# LOOP THROUGH THE POSITIONS
				$scope.chartData["all_candidates"][votePosition].foreach(function(candidateData, candidatePos){
					
					charts[votePosition].push( [ candidateData.name, ( $scope.results[votePosition][candidateData.id] != undefined ) ? $scope.results[votePosition][candidateData.id] : 0 ] )
					//$scope.$apply()
					
				});
			
			
			$scope.charts[votePosition] = {
				            loading:false,
							chart: {
								backgroundColor: 'transparent',
								zoomType: 'xy',
								resetZoomButton: {
									position: {
										x: 0,
										y: -35
									}
								},
								options3d: {
									enabled: true,
									alpha: 15,
									beta: 15,
									depth: 50,
									viewDistance: 25
								}
							},
							title: {
								text: `${$scope.chartData["all_positions"][votePosition]}`
							},           
							subtitle: {
								text: "Realtime results"
							},
							xAxis: {
								type: 'category',
								labels: {
									rotation: -60,
									style: {
										fontSize: '10px',
										fontFamily: 'Verdana, sans-serif'
									}
								}
							},
							yAxis: {
								min: 0,
								title: {
									text: 'Votes'
								}
							},
							legend: {
								enabled: false
							},
							tooltip: {
								pointFormat: 'Votes : <b>{point.y:.0f} </b>'
							},
							colors: ["rgba(35,34,122, 1)","#995030","#000099"],
							colorByPoint: true,
							series: [{
								name: 'Votes',
								type: $scope.chartType,
								color: "deepskyblue",
								data:charts[votePosition],
								/* color: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', 
				'#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],*/
								dataLabels: {
									enabled: true,
									rotation: 0,
									color: '#FFFFFF',
									align: 'right',
									format: '{point.y:.0f}', // no decimal
									y: 17, // 10 pixels down from the top
									style: {
										fontSize: '13px',
										fontFamily: 'Verdana, sans-serif'
									}
								},
								
							}],
							
								exporting: {
									enabled: true
								},
								credits: {
									enabled: false
								},
							plotOptions: {
							series: {
								lineWidth: 1,
								fillOpacity: 0.5
			
							},
							column: {
								stacking: 'normal'
							},
							area: {
								stacking: 'normal',
								marker: {
									enabled: false
								}
							}
						,useHighStocks: false
						,size: {
								width: '100%',
								height: '100%'
							}
					}
						
				}
			
			//$scope.$apply();
			
		});
				
	};

	
	// //! HANDLE SOCKET REQUEST LIVE VOTING DATA
	// $scope.Chartsinit = function(){
	// 	//socket.
	// }
	
	
	//! SOCKET IO FUNCTIONS FOR REALTIME DATA UPDATES 
	//@ INITIALIZE SOCKET.IO
	var socket = io.connect(ip);
	
	//! RE DRAW THE CHART OBJECT
	
	
	//! REQUEST SIMPLE VOTE DATA UPDATE
	$scope.refreshVotes = function(){
		
		/**
		 * 	FETCH LIVE VOTE DATA
		 **/ 
		socket.emit("getVotes",{});
				
		// /**
		//  * 	FETCH VOTER DATA
		//  **/ 
		//  socket.emit("getVoters",{});
		
	};
	
	//! HANDLE INITIAL SOCKET CONNECTION
	socket.on("connect", function(data){
		
		//@ REQUEST A FRESH LIST OF POLL PROCEEDINGS
		$scope.refreshVotes();
		setTimeout( function(){
			$scope.scroll();
		},4000)
		
		
	});
	
	//! HANDLE SOCKET DISCONNECTION
	socket.on("disconnect", function(data){
		
		//@ SET A VISUAL DECIPHERABLE DISCONNECTION WARNING
		$(function(){$("body").css("background-color","#F00");});
		
	});
	
	//! HANDLE SOCKET RECONNECTION
	socket.on("reconnect", function(data){
			
		//@ REQUEST A FRESH LIST OF POLL PROCEEDINGS
		$scope.refreshVotes();
		
		//@ SET A VISUAL DECIPHERABLE  RE CONNECTION NOTICE
		$(function(){$("body").css("background-color","#FFF");});
		
	});
	
	
	//@ HANDLE VOTE RECORD UPDATES
	socket.on("voteUpdate",function(pollData){
		
		//@@ UPDATE THE LOCAL CHART DATA OBJECT 
		$scope.chartData["votes"] = pollData.votes;		
		$scope.drawCharts();
		$scope.$apply();
		
	});
	
	//@ HANDLE VOTER RECORD UPDATES
	socket.on("voterUpdate", function(pollData){
		
		//@@ UPDATE THE LOCAL CHART DATA OBJECT 
		$scope.chartData["voters"] = pollData.voters;
		$scope.$apply();
		
	});	
	
}])