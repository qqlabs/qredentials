(function() {
    var app = angular.module('qred-account', ['ngRoute']);
    app.config(function($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: 'register.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'LoginController'
            });
    });
    app.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.emailTaken = false;
        $scope.submit = function() {
            $scope.emailTaken = false;
            console.log($scope.email);
            $http.post('http://wontonst.com', {
                email: $scope.email,
                password: $scope.password
            }).success(function(data, status, headers, config) {
                console.log(response);
                $location.path('/profile'); //TODO GET PROFILES URL
            }).error(function(data, status, headers, config) {
                $scope.emailTaken = true; //TODO maybe have two errors "conn bad" and "email taken"
            });
        };
    }]);
    app.controller('RegisterController', ['$scope', '$http', function($scope, $http) {
        $scope.submit = function() {
            $http.post('/res/account.php', {
                name: $scope.name,
                email: $scope.email,
                password: $scope.password,
                action: "register"
            }).success(function(data, status, headers, config) {
                console.log(data);
                $location.path('/login'); //TODO GET PROFILES URL
            }).error(function(data, status, headers, config) {
                $scope.emailTaken = true; //TODO maybe have two errors "conn bad" and "email taken"
            });
        };
    }]);
})();