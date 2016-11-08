var app = angular.module("myApp", ["ngRoute", "controllers", 'bixApp', "datatables"])

.config(function($routeProvider) {

    /*
    		{ 
    			path :"/",
    			template: "/views/"
    			,menu: ""
    			,icon: ""
    			,controller: ""
    		}
    */

    //@ INITIALIZE THE ROOT ROUTE
    $routeProvider
        .when("/", {
            templateUrl: "views/index.html"
        });


    $.getJSON('app-routes.json')
        .then(function(data) {
            // alert(JSON.stringify(data))
            setRoutes(data);
        })

    //@ HANDLE THE SETTING OF PRE-DEFINED ROUTES
    var setRoutes = (routeArray) => {

        routeArray = routeArray || [];

        routeArray.forEach(function(routeData) {
            $routeProvider
                .when(routeData.url, {
                    templateUrl: routeData.view,
                    controller: routeData.controller
                });
        });

    };

    //@ REDIRECT TO THE NOT FOUND PAGE
    $routeProvider.otherwise({
        templateUrl: "views/404.html"
    });
})