angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/views/menu.html',
            controller: 'mainCtrl'
        })
        .state('app.tasks', {
            url: "/tasks",
            views: {
                'menuContent': {
                    templateUrl: "app/views/tasks.html",
                    controller: 'taskCtrl'
                }
            }
        })
        .state('app.completed', {
            url: "/completed",
            views: {
                'menuContent': {
                    templateUrl: "app/views/completed.html",
                    controller: 'taskCtrl'
                }
            }
        })
        .state('app.taskDetail', {
            url: "/taskdetail",
            views: {
                'menuContent': {
                    templateUrl: "app/views/task-detail.html",
                    controller: 'taskCtrl'
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'mainCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/views/signup.html',
            controller: 'userCtrl'
        })
        .state('newTask', {
            url: "/new-task",
            templateUrl: "app/views/new-task.html",
            controller: 'newTaskCtrl'
        })
        .state('taskDetail', {
            url: "/task-detail",
            templateUrl: "app/views/task-detail.html",
            controller: 'taskCtrl'
        });

    $urlRouterProvider.otherwise("/login");
})