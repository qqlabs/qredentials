(function() {
    var app = angular.module('qredentials', []);
    app.controller('LoginFormController', ['$scope','$http', function($scope,$http) {
        $scope.submit = function() {
            $http.post('http://wontonst.com', {
                email: $scope.email,
                password: $scope.password
            }).success(function(data,status,headers,config){
            console.log(response);
			}).error(function(data,status,headers,config){
			console.log("fail");
			});
        }
    }]);
})();