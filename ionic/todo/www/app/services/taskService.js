angular.module('taskService', [])

.factory('Task', function($http, apiUrl) {

    var taskFactory = {};

    taskFactory.getAll = function() {
        return $http.get(apiUrl + '/tasks');
    };

    taskFactory.getTaskById = function(taskId) {
        return $http.get(apiUrl + '/tasks/id/' + taskId);
    };

    taskFactory.getTasksByUser = function(creatorId) {
        return $http.get(apiUrl + '/tasks/user/' + creatorId);
    };

    taskFactory.getTasksByList = function(listId) {
        return $http.get(apiUrl + '/tasks/list/' + listId);
    };

    taskFactory.create = function(taskData) {
        return $http.post(apiUrl + '/createTask', taskData);
    };

    taskFactory.remove = function(taskData) {
        return $http.post(apiUrl + '/removeTask', taskData);
    };

    taskFactory.complete = function(taskData) {
        return $http.post(apiUrl + '/completeTask', taskData);
    };

    return taskFactory;
});