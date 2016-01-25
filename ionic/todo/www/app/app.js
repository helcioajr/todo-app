// setup angular
angular.module('todo', ['ionic', 'appRoutes', 'mainController', 'taskController', 'newTaskController',
    'userController', 'taskService', 'userService', 'authService', 'LocalStorageModule', 'constants'
])

.config(function(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('todo');
})

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});