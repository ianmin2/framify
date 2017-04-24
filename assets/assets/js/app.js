var sort_by = function(field,reverse,primer){
    var key     = primer ? function(x){ return primer(x[field]) } : function(x){ return x[field] } ;
    reverse     = !reverse ? 1 : -1;
    return function(a,b){
        return a = key(a), b = key(b), reverse* ((a>b) - (b>a));
    }
}


angular.module('framify', ['framify.js'])
// !CONFIGURE THE BNASIC PRE-RUNTIME STATES OF THE APPLICATION
.config(["$stateProvider","$urlRouterProvider","$provide", function($stateProvider,$urlRouterProvider,$provide) {

    $stateProvider

    //@ Improper redirection pages
    .state("app.404", {
        url: "/404"
        ,templateUrl: 'views/404.html'
    })
    .state("app.500", {
        url: "/500"
        ,templateUrl: 'views/500.html'
    })
    
    //@  Main application routes
    .state('app', {
        url: "/app"
        ,templateUrl: 'views/dash.html'
        // ,abstract: 'app.index'
        ,controller: 'framifyController'
        // resolve: {
        //     currentStats: function($http) {
        //         // return $http.get('/currentStats')
        //         //         .then(function(response){
        //         //             return response.data;
        //         //         })
        //         return {};
        //     }
        // }
    })
    .state("app.index", {
        url: "/index"
        ,templateUrl: "views/index.html"
    })
    .state("app.signup", {
        url: "/signup"
        ,templateUrl: "views/signup.html"
    })
    .state("app.login",{
        url: "/login"
        ,templateUrl: "views/login.html"
    })
    .state("app.panel",{
        url: "/panel"
        ,cache:false
        ,templateUrl: "views/panel.html"
    })

    //!EXTENDED ROUTE SETTING
    var setRoutes = (routeArray) => {

        // return new Promise( function(resolve,reject){

            // var processed = 0;
                
            routeArray = routeArray.sort(sort_by('title',false,function(a){return a.toLowerCase()})) || [];

            
            $stateProvider
            
            routeArray
            .forEach( (rData, r) => {

                // processed++;

                var currState = "app." + rData.path;
                $stateProvider.state(currState, {
                    url: rData.url
                    ,templateUrl: rData.view
                    ,controller: ((rData.controller) ? rData.controller : "")
                    ,cache: false
                });

                // if(processed == routeArray.length){
                    
                    //!REDIRECT APP TO THE ROOT IN THE CASE THAT THE REQUESTED ROUTE IS NOT FOUND
                    $urlRouterProvider.otherwise('/app/index');

                // }

            })

        // })         
        // alert("setRoutes function successfully setup")
        
    };


    //!CAPTURE THE DEFINED JSON ROUTES
    // $.getJSON("./config/app-routes.json", function(response) {
    //     setRoutes(response);
    // });


    //!CAPTURE THE DEFINED JSON ROUTES
    $.getJSON("./config/app-routes.json")
    .then(setRoutes)
    .then(function(){
        $urlRouterProvider.otherwise('/app/login');
    });


    $provide.decorator('$state', function($delegate, $stateParams) {

        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };

        return $delegate;

    });
        


    //!REDIRECT APP TO THE ROOT IN THE CASE THAT THE REQUESTED ROUTE IS NOT FOUND
    $urlRouterProvider.otherwise('/app/index');

}])

//!DEFINE THE APPLICATION RUNTIME DEFAULTS
.run(
["app","cgi","$rootScope","$state","$localStorage","sms"
,function(app,cgi,$rootScope,$state,$localStorage,sms) {

        $rootScope.sort_by = function(field,reverse,primer){
            var key     = primer ? function(x){ return primer(x[field]) } : function(x){ return x[field] } ;
            reverse     = !reverse ? 1 : -1;
            return function(a,b){
                return a = key(a), b = key(b), reverse* ((a>b) - (b>a));
            }
        };


        //# SETUP AND DEFINE THE APPLICATION ROUTES INTO AN ALL ACCESSIBLE 'links' VARIABLE
        $rootScope.links = [];
        $.getJSON("./config/app-routes.json")
        .then(function(routes){
            $rootScope.links = routes.sort($rootScope.sort_by('title',false,function(a){return a.toLowerCase()}));
        });

        //! INJECT THE LOCATION SOURCE TO THE ROOT SCOPE
        $rootScope.location = $state;

        //! INJECT THE $localStorage instance into the root scope
        $rootScope.storage = $localStorage;

        //! INJECT THE APPLICATION'S MAIN SERVICE TO THE ROOT SCOPE SUCH THAT ALL SCOPES MAY INHERIT IT
        $rootScope.app = app;

        //! INJECT THE APP BASICS SERVICE
        $rootScope.cgi = cgi;

        //! SIMPLE APPLICATION BEHAVIOR SETUP
        $rootScope.frame = {};

        //#! INJECT THE SMS INSTANCE INTO THE MAIN SCOPE
        $rootScope.sms = sms;

        //! IDENTIFY THE CURRENT PATH
        $rootScope.frame.path = function() {
            return $state.absUrl().split("/#/")[0] + "/#/" + $state.absUrl().split("/#/")[1].split("#")[0];
        };
        //p.split("/#/")[0]+"/#/"+p.split("/#/")[1].split("#")[0]

        //! RELOCATION HANDLING
        $rootScope.frame.relocate = function(loc) {
            console.log('Relocating to: #' + loc);
            $rootScope.location.go(loc);
        };

        //! ADMIN HANDLING  
        $rootScope.frame.is_admin = false;

        //! ADMIN STATUS CHECKER 
        $rootScope.frame.isAdmin = function() {
            return $rootScope.frame.is_admin ? true : false;
        };

        //! ROOT USER STATUS CHECKER
        $rootScope.frame.isRoot = function() {
            return $rootScope.storage.admin.access == 0 ? true : false;
        };

        //! ADMIN STATUS SWITCH
        $rootScope.frame.changeAdmin = function(bool) {
            $rootScope.frame.is_admin = bool;
            //  $rootScope.$apply();
        };

        //! RESET THE ADMIN STATUS
        $rootScope.frame.reset = function() {
            delete $rootScope.storage.admin;
            delete $rootScope.storage.user;
            $rootScope.frame.changeAdmin(false);
            window.location = "/#/";
        };
    }])
    
    .controller("frameController", ["$scope", function($scope) {

    }])