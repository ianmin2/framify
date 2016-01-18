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
               templateUrl  : rData.view,
               controller   : rData.controller
            });       
            
        }
        
    }; 
    
    	
    //!CAPTURE THE DEFINED JSON ROUTES
    $.getJSON( "./config/app-routes.json", function( response ){
         setRoutes( response );
    });
        
    //!REDIRECT APP TO THE ROOT ROUTE
    $urlRouterProvider.otherwise('/framify');
    
});

//!DEFINE THE APPLICATION RUNTIME DEFAULTS
app.run(["app","$rootScope","$location", "formlyConfig",function( app, $rootScope, $location, formlyConfig ){
    
    //!INJECT THE LOCATION SOURCE TO THE ROOT SCOPE
    $rootScope.location = $location;
    
    //!INJECT THE APPLICATION'S MAIN SERVICE TO THE ROOT SCOPE SUCH THAT ALL SCOPES MAY INHERIT IT
    $rootScope.app = app;
    
    //!ANGULAR FORMLY CONFIGURATION
    /*formlyConfig.setWrapper({
        template: '<formly-transclude></formly-transclude><!--<div my-messages="options"></div>-->',
        types: ["input","checkbox","select","textarea","radio"]
    })*/

    formlyConfig.setType({
        name: "stats",
        template: '<div class="p+ bgc-green-100" style="margin:10px; max-width:450px;" ng-repeat="(key,val) in this">$scope.{{key}} = {{val | json}}</div><br><br>'
    })
    
   /* formlyConfig.setType({
        name: "checkbox",
        template: '<br><div class="switch">\
            <input type="checkbox" class="switch__input" id="model[options.key]" ng-model="model[options.key]">\
            <label for="model[options.key]" class="switch__label">{{options.templateOptions.label}}</label>\
            <switch class="switch__help">{{options.templateOptions.description}}</switch>\
        </div>'
    })*/

    formlyConfig.setType({
        name: "submit",
        template: '<br><button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--blue mdl-cell mdl-cell--2-col" style="min-width: 200px; margin:10px; min-height:25px; color:whitesmoke; font-weight:bold;" ng-hide="{{options.templateOptions.disabled}}">{{options.templateOptions.label}}</button>',
        defaultOptions: {
            templateOptions: {
                label: "SUBMIT"
            }
        }
    })
    
    formlyConfig.setType({
        name: "terms",
        extends: "checkbox",
        defaultOptions: {
            'templateOptions': {
                'label': 'Accept Terms and conditions',
                'description': "I Agree to all the terms of use",
                'disabled': false, // ng-disabled
                'checked': false // ng-checked
              }
        }
    })

}]);
