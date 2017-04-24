var app = angular.module("framifyApp", ['framify.js'])

.config(
["$stateProvider" ,"$urlRouterProvider"
,function($stateProvider ,$urlRouterProvider) {

    /*
    		{ 
    			path :"app"
                ,url: "/app"
    			,menu: ""
    			,icon: ""
                ,title: ""
                ,parent: ""
    			,controller: ""
                ,view: '/path/to/view'
    		}
    */

    //@ INITIALIZE THE ROOT ROUTE
    $stateProvider
    .state("app", {
        url:   '/app'
        ,templateUrl: "views/index.html"
        ,controller: "framifyController"        
    });

    //@ FETCH THE ROUTERIFY GENERATED ROUTES
    $.getJSON('app-routes.json')
    .then(function(data) {
        setRoutes(data);
    });

    //@ HANDLE THE SETTING OF THE GULP GENERATED ROUTES
    var setRoutes = (routeArray) => {

        routeArray = routeArray || [];

        routeArray.forEach(function(routeData) {
            $stateProvider
            .state( routeData.path, {
                url: routeData.url
                ,templateUrl: routeData.view
                ,controller: ( routeData.controller != "framifyController" ) ? routeData.controller : undefined
            });
        });

    };

    $urlRouterProvider.otherwise("/app");

}])