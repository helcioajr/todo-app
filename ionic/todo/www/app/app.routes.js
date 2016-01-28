angular.module("appRoutes", [])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state("app", {
            url: "/app",
            abstract: true,
            templateUrl: "app/views/menu.html",
            controller: "mainCtrl"
        })
        .state("app.lists", {
            url: "/lists",
            views: {
                "menuContent": {
                    templateUrl: "app/views/lists.html",
                    controller: "listCtrl"
                }
            }
        })
        .state("app.tasks", {
            url: "/tasks/:list_id",
            views: {
                "menuContent": {
                    templateUrl: "app/views/tasks.html",
                    data: {
                        list_id: "list_id"
                    },
                    controller: "taskCtrl"
                }
            }
        })
        .state("app.completed", {
            url: "/completed",
            views: {
                "menuContent": {
                    templateUrl: "app/views/completed.html",
                    controller: "taskCtrl"
                }
            }
        })
        .state("login", {
            url: "/login",
            templateUrl: "app/views/login.html",
            controller: "mainCtrl"
        })
        .state("signup", {
            url: "/signup",
            templateUrl: "app/views/signup.html",
            controller: "userCtrl"
        });

    $urlRouterProvider.otherwise("/login");
})