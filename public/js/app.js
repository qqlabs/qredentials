(function() {
    var app = angular.module('qred-login', []);
    app.controller('LoginFormController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.emailTaken = false;
        $scope.submit = function() {
        $scope.emailTaken = false;
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
})();
(function() {
        var app = angular.module('qred-profile', []);
        app.controller('ProfileController', ['$scope', function($scope) {
                $scope.profile = {};
                this.load = function(id) {
                    $http.get('&id=' + id). //TODO get URL
                    success(function(data, status, headers, config) {
                        $scope.profile = JSON.parse(data);
                    }).
                    error(function(data, status, headers, config) {
                        //TODO error
                    });
                }]); 
		app.controller('WallController', ['$scope', function($scope) {
            $scope.posts = [];
            this.load = function(id) {
                $http.get('&id=' + id). //TODO get URL
                success(function(data, status, headers, config) {
                    $scope.posts = JSON.parse(data);
                }).
                error(function(data, status, headers, config) {
                    //TODO error
                });
            };
        }]);
})();
(function() {
var app = angular.module('qred-register',[]);
app.controller('RegisterController',['$scope',function($scope){
$scope.submit=function(){

}
}]);
}();