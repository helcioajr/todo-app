angular.module('listService', [])

.factory('List', function($http, apiUrl) {

    var listFactory = {};

    listFactory.getAll = function() {
        return $http.get(apiUrl + '/lists');
    };

    listFactory.getList = function(listId) {
        return $http.get(apiUrl + '/lists/id/' + listId);
  ;  }

    listFactory.create = function(listData) {
        return $http.post(apiUrl + '/createList', listData);
    };

    listFactory.remove = function(listData) {
        return $http.post(apiUrl + '/removeList', listData);
    };

    return listFactory;
});