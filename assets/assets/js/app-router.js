//!CONFIGURE THE BNASIC PRE-RUNTIME STATES OF THE APPLICATION
app.config(function($stateProvider,$urlRouterProvider){
    
    $stateProvider.state( "framify" , {
               url          :"/framify",
               templateUrl  : "views/1app.html"
            }); 
    
    //!THE DYNAMIC ROUTE SETTER
    var setRoutes = function( routeArray ){
        
        routeArray = routeArray || [];
               
        for( r in routeArray ){
            
            var rData = routeArray[r]
            
            $stateProvider.state( rData.path , {
               url          : rData.url,
               templateUrl  : rData.view
            });       
            
        }
        
    }; 
    
    	
    //!CAPTURE THE DEFINED JSON ROUTES
    $.getJSON( "config/app-routes.json", function( response ){
         setRoutes( response );
    });
        
    //!REDIRECT APP TO THE ROOT ROUTE
    $urlRouterProvider.otherwise('/framify');
    
});

//!DEFINE THE APPLICATION RUNTIME DEFAULTS
app.run( function(app, $rootScope, $location ){
    
    //!INJECT THE LOCATION SOURCE TO THE ROOT SCOPE
    $rootScope.location = $location;
    
    //!INJECT THE APPLICATION'S MAIN SERVICE TO THE ROOT SCOPE SUCH THAT ALL SCOPES MAY INHERIT IT
    $rootScope.app = app;

})