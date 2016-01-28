angular.module('userController', [])

.controller('userCtrl', function(User, localStorageService, $scope, $state, $ionicHistory) {

    $scope.userData = {};

    $scope.doSignup = function() {
        $scope.message = '';
        User.create($scope.userData)
            .then(function(res) {
                $scope.userData = {};
                $scope.message = res.data.message;
                console.log(res);
                localStorageService.set('token', res.data.token);
                $state.go('login');
            });
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
})