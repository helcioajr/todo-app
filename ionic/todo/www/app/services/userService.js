angular.module('userService', [])

.factory('User', function($http, apiUrl) {

    var userFactory = {};

    userFactory.create = function(userData) {
        return $http.post(apiUrl + '/signup', userData);
    }

    return userFactory;
})