(function() {
    var app = angular.module('qred-login', []);
    app.controller('LoginFormController', ['$scope', '$http', '$location', function($scope, $http, $location) {
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
})();
(function() {
    var app = angular.module('qred-profile', []);
    app.controller('ProfileController', ['$scope', function($scope) {
        $scope.profile = {
            name: "Roy Chang",
            pic: "http://placehold.it/300x240&text=[img]",
            company: "HackSC",
            title: "Senior Executive Intern",
            addresses: [
                "123 Easy St.",
                "Apt 44",
                "District 13"
            ],
            city: 'San Jose',
            state: 'CA',
            country: 'United States',
            postal: '95129',
            email: 'rchang@zheng.com',
			phone_numbers: [ '888-888-9999', '123-333-1111'],
            sites: [{
                url: 'http://google.com',
                name: 'Google'
            }, {
                url: 'http://yahoo.com',
                name: 'Yahoo'
            }, {
                url: 'http://youtube.com',
                name: 'YouTube'
            }]
        };
        this.load = function(id) {
            $http.get('&id=' + id). //TODO get URL
            success(function(data, status, headers, config) {
                $scope.profile = JSON.parse(data);
            }).
            error(function(data, status, headers, config) {
                //TODO error
            });
        };
    }]);
    app.controller('WallController', ['$scope', function($scope) {
        $scope.posts = [{
            author: 'Kate',
            pic: 'http://placehold.it/50x50&text=[K]',
            content: 'Yo wanna buy a joint',
            comments: [{
                author: 'Quentin',
                pic: 'http://placehold.it/50x50&text=[Q]',
                content: 'hell yea dawg'
            }, {
                author: 'Jack',
                pic: 'http://placehold.it/50x50&text=[J]',
                content: 'durgz maek u short n r not c00l'
            }]
        }, {
            author: 'Jack',
            pic: 'http://placehold.it/50x50&text=[J]',
            content: 'u suk at programing n00b l2p c++ gtfolmaorofl nubcakes, peace.'
        }, ];
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
    var app = angular.module('qred-register', []);
    app.controller('RegisterController', ['$scope','$http' ,function($scope,$http) {
        $scope.submit = function() {
            $http.post('http://wontonst.com', {
                name: $scope.name,
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
    var app = angular.module('qred-edit-profile', []);
    app.controller('EditProfileController', ['$scope','$http', function($scope,$http) {
        $scope.load = function() {
            $http.get('/').success(function(data, status, headers, config) {
                console.log(data);
            }).error(function(data, status, headers, config) {
                //TODO "conn bad

                data = {
                    name: "Roy Chang",
                    pic: "http://placehold.it/300x240&text=[img]",
                    company: "HackSC",
                    title: "Senior Executive Intern",
                    addresses: [
                        "123 Easy St.",
                        "Apt 44",
                        "District 13"
                    ],
                    city: 'San Jose',
                    state: 'CA',
                    country: 'United States',
                    postal: '95129',
                    email: 'rchang@zheng.com',
			phone_numbers: [ '888-888-9999', '123-333-1111'],
                    sites: [{
                        url: 'http://google.com',
                        name: 'Google'
                    }, {
                        url: 'http://yahoo.com',
                        name: 'Yahoo'
                    }, {
                        url: 'http://youtube.com',
                        name: 'YouTube'
                    }]
                };
				$scope.profile=data;
				for (var attrname in data) { $scope[attrname] = data[attrname]; }
            });
        };
		$scope.load();
        $scope.submit = function() {
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