(function() {
    var app = angular.module('qred-account', ['ngRoute','LocalStorageModule']);
    app.config(function($routeProvider, localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('qred');
        $routeProvider.when('/', {
                templateUrl: '/directives/register.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: '/directives/login.html',
                controller: 'LoginController'
            });
    });
    app.controller('LoginController', ['$scope', '$http', '$location', 'localStorageService', function($scope, $http, $location,localStorageService) {
        $scope.emailTaken = false;
        $scope.submit = function() {
            $scope.emailTaken = false;
            console.log($scope.email);
            $http.post('/api/v1/token', {
			'grant_type': 'password',
                username: $scope.email,
                password: $scope.password
            }).success(function(data, status, headers, config) {
                $location.path('/profile');
				localStorageService.set('token',data.access_token);
				localStorageService.set('user_id',data.user.uuid);
            }).error(function(data, status, headers, config) {
                $scope.emailTaken = true; //TODO maybe have two errors "conn bad" and "email taken"
            });
        };
    }]);
    app.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.submit = function() {
            $http.post('/api/v1/users', {
                name: $scope.name,
                username: $scope.email,
                password: $scope.password,
            }).success(function(data, status, headers, config) {
                console.log(data);
                $location.path('/login'); //TODO GET PROFILES URL
            }).error(function(data, status, headers, config) {
                $scope.emailTaken = true; //TODO maybe have two errors "conn bad" and "email taken"
            });
        };
    }]);
})();