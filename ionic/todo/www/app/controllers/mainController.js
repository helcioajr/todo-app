angular.module('mainController', ['ionic', 'authService'])

.controller('mainCtrl', function($scope, $rootScope, Auth, $state, $ionicHistory) {

    $scope.loginData = {};

    $scope.user = {};

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

    Auth.getUser().then(function(res) {
        $scope.user = res.data;
    });

    $scope.loggedIn = Auth.isLoggedIn();

    $scope.doLogin = function() {

        $scope.processing = true;
        $scope.error = '';

        Auth.login($scope.loginData.username, $scope.loginData.password)
            .then(function(res) {
                if (res.data.success) {
                    $state.go('app.tasks');
                }
                else {
                    $scope.error = res.message;
                }
            });
    };

    $scope.doLogout = function() {
        Auth.logout();
        $state.go('login');
    };

});