angular.module('taskService', [])

.factory('Task', function($http, apiUrl) {

    var taskFactory = {};

    taskFactory.getAll = function() {
        return $http.get(apiUrl + '/tasks');
    };

    taskFactory.getTasksByList = function(listId) {
        return $http.get(apiUrl + '/tasks/' + listId);
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

})