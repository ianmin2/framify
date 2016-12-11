angular.module('controllers', [])

.controller("TeacherController", ['$scope', '$http', '$log', function($scope, $http, $log){
    $scope.title = "Add Teacher Form";

    // //getting details from the db
    // $http.get('http://localhost/elimu/view_teachers.php')
    // .success(function(data){
    //     $scope.teachers = data;
    // })
    // .error(function(err){
    //     $log.error(err);
    // })

    // $scope.pushData = function($params){
    //     $log.info($params);
    //     var vals = {
    //         'fname':$params.teachers_fname, 
    //         'lname':$params.teachers_lname, 
    //         'email':$params.teachers_email, 
    //         'phone':$params.teachers_phone, 
    //         'subject':$params.teacher_subject, 
    //         'password':$params.teachers_password, 
    //         'maxload':$params.teachers_maxload,
    //         'days':$params.teachers_days
    //     }
    //     $http.post('http://localhost/elimu/add_teacher.php', vals)
    //     .success(function(data){
    //         $log.info(data);
    //     })
    //     .error(function(err){
    //         $log.error(err);
    //     })
    // }


}])

.controller("StudentController", ['$scope', '$http', '$log', function($scope, $http, $log){
    $scope.title = "Add Student Form";

    // //getting details from the db
    // $http.get('http://localhost/elimu/view_student.php')
    // .success(function(data){
    //     $scope.students = data;
    // })
    // .error(function(err){
    //     $log.error(err);
    // })

    // $scope.pushData = function($params){
    //     $log.info($params);
    //     var vals = {
    //         'fname':$params.first_name,
    //         'mname':$params.middle_name,
    //         'lname':$params.last_name, 
    //         'gender':$params.student_gender, 
    //         'father_name':$params.father_name, 
    //         'father_phone':$params.father_phone, 
    //         'mother_name':$params.mother_name, 
    //         'mother_phone':$params.mother_phone, 
    //         'class':$params.student_class, 
    //         'details':$params.student_details,
    //         'file':$params.student_file,
    //         'password':$params.student_password
    //     }
    //     $http.post('http://localhost/elimu/add_students.php', vals)
    //     .success(function(data){
    //         $log.info(data);
    //     })
    //     .error(function(err){
    //         $log.error(err);
    //     })
    // }
}])

.controller('ClassesController', ['$scope', '$http', '$log', function($scope, $http, $log){
    $scope.title = "Add Classes Form";

    $scope.frmToggle = function(){
        $("#classForm").slideToggle();
    }
    
    // //getting details from the db
    // $http.get('http://localhost/elimu/view_classes.php')
    // .success(function(data){
    //     $scope.students = data;
    // })
    // .error(function(err){
    //     $log.error(err);
    // })
}])