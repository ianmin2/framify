angular.module('framify', ['framify.js'])
    // !CONFIGURE THE BNASIC PRE-RUNTIME STATES OF THE APPLICATION
    .config(["$stateProvider","$urlRouterProvider","$provide", function($stateProvider,$urlRouterProvider,$provide) {

        $stateProvider
        .state('app', {
            url: "/app"
            ,templateUrl: 'views/dash.html'
            // ,abstract: 'app.index'
            // controller: 'framifyController',
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

        //!THE DYNAMIC ROUTE SETTER
        var setRoutes = (routeArray) => {

            console.dir(routeArray)

            // return new Promise( function(resolve,reject){

                // var processed = 0;
                    
                routeArray = routeArray || [];

                
                $stateProvider
                .state("app.404", {
                    url: "/404"
                    ,templateUrl: 'views/404.html'
                })
                .state("app.500", {
                    url: "/500"
                    ,templateUrl: 'views/500.html'
                })

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
            alert("setRoutes function successfully setup")
           
        };


        //!CAPTURE THE DEFINED JSON ROUTES
        // $.getJSON("./config/app-routes.json", function(response) {
        //     setRoutes(response);
        // });


        //!CAPTURE THE DEFINED JSON ROUTES
        $.getJSON("./config/app-routes.json")
        .then(setRoutes)
        .then(function(){
            $urlRouterProvider.otherwise('/app/index');
        })


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