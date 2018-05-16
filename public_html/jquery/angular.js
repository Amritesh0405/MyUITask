var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    //4. copy originalStudent to student. student will be bind to a form 
                        $scope.student = angular.copy($scope.originalStudent);
//
//                        //5. create submitStudentForm() function. This will be called when user submits the form
                        $scope.submitStudnetForm = function () {
                            console.log("hie")
                       };
//
//                        //6. create resetForm() function. This will be called on Reset button click.  
                        $scope.resetForm = function () {
                            $scope.student = angular.copy($scope.OriginalStudent);
                        };
});