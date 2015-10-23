//!CONFIGURE THE BNASIC PRE-RUNTIME STATES OF THE APPLICATION
app.config(function($stateProvider,$urlRouterProvider){
    
    //!REDIRECT APP TO THE ROOT ROUTE
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state( "/" , {
               url          : "/app",
               templateUrl  : "views/app.html"
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
    $.ajax({
        url: "config/app-routes.json",
        success: function( response ){
            //SET THE ROUTES DYNAMICALLY
            setRoutes( response )
        }
    });
    
    
	
});

//!DEFINE THE APPLICATION RUNTIME DEFAULTS
app.run( function(app, $rootScope ){
    
    //!INHECT THE APPLICATION'S MAIN SERVICE TO THE ROOT SCOPE SUCH THAT ALL SCOPES MAY INHERIT IT
    $rootScope.app = app;

})