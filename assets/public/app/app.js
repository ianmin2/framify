var app = angular.module("myApp", ["ngRoute", "controllers",'bixApp',"datatables"])

.config(function($routeProvider){

/*
		{ 
			path :"/",
			template: "/views/"
			,menu: ""
			,icon: ""
			,controller: ""
		}
*/
	var routeArray = [
		{ 
			path :"/manage_levels",
			template: "views/manage_levels.html"
			,menu: "admin"
			,icon: ""
		}
		,{ 
			path :"/manage_users",
			template: "views/manage_users.html"
			,menu: "admin"
			,icon: ""
		}
		,{ 
			path :"/manage_streams",
			template: "views/manage_streams.html"
			,menu: "admin"
			,icon: ""
		}
		,{ 
			path :"/manage_classes",
			template: "views/manage_classes.html"
			,menu: "admin"
			,icon: ""
		}
		,{ 
			path :"/manage_roles",
			template: "views/manage_roles.html"
			,menu: "admin"
			,icon: ""
		}
		,{ 
			path :"/add_teacher",
			template: "views/add_teacher.html"
			,controller: "TeacherController"
			,menu: "forms"
			,icon: ""
		}
		,{ 
			path :"/manage_student",
			template: "/views/manage_student.html"
			,controller: "StudentController"
			,menu: "forms"
			,icon: ""
		}
		,{ 
			path :"/add_classes",
			template: "/views/add_classes.html"
			,menu: "forms"
			,icon: ""
		}
		,{ 
			path :"/view_teacher",
			template: "views/view_teacher.html"
			,menu: "tables"
			,icon: ""
		}
		,{ 
			path :"/view_student",
			template: "views/view_student.html"
			,menu: "tables"
			,icon: ""
		}
	];

	$routeProvider
	.when("/", {
		templateUrl: "views/index.html"
	});

	routeArray.forEach(function(routeData){
		$routeProvider
		.when( routeData.path, {
			templateUrl: routeData.template,
			controller: routeData.controller 
		});
	});

		// .when("/manage_streams",{
		// 	templateUrl: "views/manage_streams.html"
		// })
		// .when("/manage_users",{
		// 	templateUrl: "views/manage_users.html"
		// })
		// .when("/manage_roles",{
		// 	templateUrl: "views/manage_roles.html"
		// })
		// .when("/add_teacher", {
		// 	templateUrl: "views/add_teacher.html",
		// 	controller: "TeacherController"
		// })
        // .when("/add_student", {
		// 	templateUrl: "views/add_student.html",
		// 	controller: "StudentController"
		// })
        // .when("/add_classes", {
		// 	templateUrl: "views/add_classes.html"
		// })
        // .when("/view_teacher", {
		// 	templateUrl: "views/view_teacher.html"
		// })
        // .when("/view_student", {
		// 	templateUrl: "views/view_student.html"
		// })
		$routeProvider.otherwise({
			templateUrl: "views/404.html"
		});
})