angular.module('taskController', ['taskService', 'authService'])

.controller('taskCtrl', function(Task, $scope, $rootScope, $state, $ionicHistory) {

    //Initialize the task scope with empty object
    $scope.task = {};

    $scope.newTask = function() {
        $state.go('newTask');
    }

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

    $scope.taskDetails = function() {
        $state.go('app.taskDetail');
    };

    //Get all tasks
    $scope.getTasks = function() {
        Task.getAll().then(function(res) {
            $scope.tasks = res.data;
        });
    };

    //Removes a task
    $scope.removeTask = function(index) {
        Task.remove({
            "title": $scope.tasks[index].title
        }).then(function() {
            $scope.tasks.splice(index, 1);
        });
    };

    //Updates a new task as completed
    $scope.completeTask = function(index) {
        Task.complete({
            "title": $scope.tasks[index].title,
            "completed": $scope.tasks[index].completed
        });
    };

    //listens t refresh event
    $scope.$on('refreshTaskList', function(event, args) {
        $state.go($state.current, {}, {
            reload: true
        });
    });
})