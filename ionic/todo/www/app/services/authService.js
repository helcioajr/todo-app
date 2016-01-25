angular.module('authService', ['LocalStorageModule'])

.factory('Auth', function($http, AuthToken, apiUrl, $q) {

    var authFactory = {};

    authFactory.login = function(username, password) {
        return $http.post(apiUrl + '/login', {
            username: username,
            password: password
        }).then(function(res) {
            AuthToken.setToken(res.data.token);
            return res;
        });
    };

    authFactory.logout = function() {
        AuthToken.setToken();
    };

    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    };

    authFactory.getUser = function() {
        if (AuthToken.getToken())
            return $http.get(apiUrl + '/me');
        else
            return $q.reject({
                message: "User has no token"
            });
    };

    return authFactory;
})

.factory('AuthToken', function(localStorageService) {

    var authTokenFactory = {};

    authTokenFactory.getToken = function() {
        return localStorageService.get('token');
    };

    authTokenFactory.setToken = function(token) {
        if (token) {
            localStorageService.set('token', token);
        } else {
            localStorageService.remove('token');
        }
    };

    return authTokenFactory;
})

.factory('AuthInterceptor', function($q, AuthToken) {

    var interceptorFactory = {};

    interceptorFactory.request = function(config) {

        var token = AuthToken.getToken();

        if (token) {
            config.headers['x-access-token'] = token;
        }

        return config;
    };

    interceptorFactory.responseError = function(res) {
        if (res.status == 403)
            $state.on('login');
        return $q.reject(res);
    };

    return interceptorFactory;
})