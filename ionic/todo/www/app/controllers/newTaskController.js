angular.module("newTaskController", [])

.controller("newTaskCtrl", function($scope, Task, $rootScope, $ionicHistory, $state, Auth) {

    $scope.task = {};

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
    
    var userId = "";
    
    Auth.getUser().then(function(res) {
        userId = res.data.id;
    });

    //Creates a new task
    $scope.createTask = function() {
        Task.create({
        "title": $scope.task.title,
        "completed": $scope.task.completed,
        "creator": userId

        }).then(function() {
        $rootScope.$broadcast("refreshTaskList");
        $scope.task = {};
        //close new task modal
        $ionicHistory.goBack();
        
        });
    };
})