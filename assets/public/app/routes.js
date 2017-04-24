angular.module('routes', [])

.config(function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "index.html"
		})
		.when("/add_teacher", {
			templateUrl: "views/add_teacher.html",
			controller: "TeacherController"
		})
})