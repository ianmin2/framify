angular.module('routes', [])

.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'views/index.html'
    })
    .when('/add_teacher', {
        templateUrl: 'views/add_teacher.html',
        controller:'TeacherCtrl'
    })
    .otherwise({
        templateUrl: 'views/404.html'
    })
})