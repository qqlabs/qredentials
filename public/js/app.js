(function() {
    var app = angular.module('qredentials', []);
    app.controller('LoginFormController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        this.emailTaken = 'what the ';
        $scope.submit = function() {
            $http.post('http://wontonst.com', {
                email: $scope.email,
                password: $scope.password
            }).success(function(data, status, headers, config) {
                console.log(response);
                $location.path('/profile');
            }).error(function(data, status, headers, config) {
                $scope.emailTaken = true;
            });
        };
    }]);
})();