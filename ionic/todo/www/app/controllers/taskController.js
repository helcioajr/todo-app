angular.module('taskController', [])

.controller('taskCtrl', function(Task, Auth, List, $scope, $state, $stateParams, $ionicHistory, $ionicLoading) {

    $scope.tasks = [];
    $scope.task = {};

    $scope.list = {};

    List.getList($stateParams.list_id).then(function(res) {
        $scope.list = res.data;
    });

    $scope.show = function() {
        $ionicLoading.show({
            template: "<ion-spinner icon='ios'></ion-spinner>"
        });
    };
    $scope.hide = function() {
        $ionicLoading.hide();
    };

    //Get all tasks
    $scope.show();
    Task.getTasksByList($stateParams.list_id).then(function(res) {
        $scope.tasks = res.data;
        $scope.hide();
    });

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

    //Creates a new task
    $scope.createTask = function() {

        var userId = "";

        Auth.getUser().then(function(res) {
            userId = res.data.id;
        });

        Task.create({
            "title": $scope.task.title,
            "creator": userId,
            "list": $stateParams.list_id
        }).then(function(err) {
            if(err) {
                console.log(err);
            }
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