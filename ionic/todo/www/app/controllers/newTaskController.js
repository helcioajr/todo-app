angular.module('newTaskController', ['taskService'])

.controller('newTaskCtrl', function($scope, Task, $rootScope, $ionicHistory, $state) {

    $scope.task = {};

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

    //Creates a new task
    $scope.createTask = function() {
        Task.create({
            "title": $scope.task.title,
            "content": $scope.task.content,
            "completed": $scope.task.completed

        }).then(function() {
            $rootScope.$broadcast('refreshTaskList');
            $scope.task = {};
            //close new task modal
            $ionicHistory.goBack();
            
        });
    };
})