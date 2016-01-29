angular.module("listController", [])

.controller("listCtrl", function(List, Auth, $rootScope, $scope, $state, $ionicHistory, $ionicModal, $ionicLoading, $ionicBackdrop) {

    $scope.lists = [];
    $scope.list = {};
    $scope.user = {};

    Auth.getUser().then(function(res) {
        $scope.user = res.data;
    });

    $ionicModal.fromTemplateUrl("app/views/new-list-modal.html", {
        scope: $scope,
        animation: "slide-in-up",
        backdropClickToClose: true,
        hardwareBackButtonClose: true,
        focusFirstInput: true
    }).then(function(modal) {
        $scope.newListModal = modal;
    });

    $scope.goToListTasks = function(index) {
        $state.go("app.tasks", {
            list_id: $scope.lists[index]._id
        });
    };

    $scope.openModal = function() {
        $scope.newListModal.show();
    };

    //Get all lists
    List.getAll().then(function(res) {
        $scope.lists = res.data;
    });

    //Creates a new list
    $scope.createList = function() {
        List.create({
            "title": $scope.list.title,
            "creator": $scope.user.id
        }).then(function() {
            $rootScope.$broadcast("refreshLists");
            //close new list modal
            $scope.newListModal.hide();
            $scope.list = {};
        });
    };

    //Removes a list
    $scope.removeList = function(index) {
        List.remove({
            "title": $scope.list[index].title
        }).then(function() {
            $scope.list.splice(index, 1);
        });
    };

    //listens t refresh event
    $scope.$on("refreshLists", function(event, args) {
        $state.go($state.current, {}, {
            reload: true
        });
    });
})