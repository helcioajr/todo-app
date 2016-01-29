angular.module('taskController', [])

.controller('taskCtrl', function(Task, Auth, List, $scope, $state, $stateParams, $ionicHistory, $ionicLoading) {

    $scope.tasks = [];
    $scope.task = {};

    $scope.list = {};

    List.getList($stateParams.list_id).then(function(res) {
        $scope.list = res.data;
    });

    //Get all tasks
    Task.getTasksByList($stateParams.list_id).then(function(res) {
        $scope.tasks = res.data;
    });

    $scope.goBack = function() {
        $state.go('app.lists');
    };

    //Creates a new task
    $scope.createTask = function() {
        Auth.getUser().then(function(res) {
            $scope.userId = res.data.id;
        });

        Task.create({
            "title": $scope.task.title,
            "creator": $scope.userId,
            "list": $stateParams.list_id
        }).then(function() {
            $scope.tasks.push($scope.task);
            $scope.task = {};
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
            "_id": $scope.tasks[index]._id,
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