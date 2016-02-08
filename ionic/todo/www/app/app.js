// setup angular
angular.module('todo', ['ionic', 'appRoutes', 'ngCordova', 'ngMessages', 'mainController', 'taskController', 'listController',
    'userController', 'taskService', 'userService', 'authService', 'listService', 'LocalStorageModule', 'constants'
])

.config(function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('todo');
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });