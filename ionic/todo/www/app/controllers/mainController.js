angular.module('mainController', [])

.controller('mainCtrl', function($scope, Auth, $state, $ionicHistory, $cordovaToast) {

    $scope.loginData = {};

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

    $scope.user = {};
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
                    $state.go('app.lists');
                }
                else {
                    $scope.error = res.data.message;
                    $cordovaToast.show($scope.error, "long", "bottom").then(function() {
                        console.log("native toast shown!");
                    });
                }
            });
    };

    $scope.doLogout = function() {
        Auth.logout();
        $state.go('login');
    };

});