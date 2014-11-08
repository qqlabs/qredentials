(function() {
    var app = angular.module('qred-login', []);
    app.controller('LoginFormController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.emailTaken = false;
        $scope.submit = function() {
            $http.post('http://wontonst.com', {
                email: $scope.email,
                password: $scope.password
            }).success(function(data, status, headers, config) {
                console.log(response);
                $location.path('/profile');//TODO GET PROFILES URL
            }).error(function(data, status, headers, config) {
                $scope.emailTaken = true;//TODO maybe have two errors "conn bad" and "email taken"
            });
        };
    }]);
})();
(function(){
var app = angular.module('qred-profile',[]);
app.controller('WallController',['$scope',function($scope){

}]);
})();