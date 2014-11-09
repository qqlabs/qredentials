(function() {
    var app = angular.module('qred-profile', ['ngRoute']);
    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/directives/profile.html',
        })
        .when('/my', {
            templateUrl: '/directives/mycard.html',
        })
        .when('/edit',{
           templateUrl: '/directives/edit_profile.html',
       })
        .when('/wall',{
           templateUrl: '/directives/wall.html',
       });
    });
	app.controller('BrowseController',['$scope','$rootScope',function($scope,$rootScope){
}]);

    app.controller('ProfileController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	
	$('#fuckthis').css('background-image' , 'url(/img/desk.jpg)');
     $scope.profile = {};
     $scope.load = function(id) {
            $http.get('&id=' + id). //TODO get URL
            success(function(data, status, headers, config) {
                $scope.profile = data;
            }).
            error(function(data, status, headers, config) {
                //TODO error
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
                    phone_numbers: ['888-888-9999', '123-333-1111'],
                    sites: [{
                        url: 'http://google.com',
                        name: 'Google'
                    }, {
                        url: 'http://yahoo.com',
                        name: 'Yahoo'
                    }, {
                        url: 'http://youtube.com',
                        name: 'YouTube'
                    }],
                    qrurl : "qred.azurewebsites.net/browse.html"

                };
                $rootScope.profile = data;
                $scope.profile = data;
                $scope.profile.address = data.addresses[0];
                $scope.profile.phone_number = data.phone_numbers[0];
                $scope.profile.site = data.sites[0].url;
                $scope.profile.qrurl = "http://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=" + data.qrurl;

                splitname = data.name.split(" ");
                vc = "BEGIN:VCARD\nVERSION:3.0\n";
                vc += "N:" + splitname[1] + ";" + splitname[0] + "\n";
                vc += "FN:" + splitname[0] + "\n";
                vc += "EMAIL:" + data.email + "\n";
                vc += "TEL;TYPE=HOME:" + data.phone_numbers[0] + "\n";
                vc += "END:VCARD";
                vc = encodeURIComponent(vc);

                $scope.profile.qrcontact = ("http://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=" + vc);
                
            });
};
$scope.load();
}]);
app.controller('WallController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $scope.posts = [];
    $scope.submit = function() {
        $http.post('http://wontonst.com', {
            content: $scope.new_post,
            target: $rootScope.profile.email
        }).success(function(data, status, headers, config) {
            $scope.posts.push({
                author: $scope.self.name,
                content: $scope.new_post,
                pic : $scope.self.pic
            });
        }).error(function(data, status, headers, config) {});
    };
    $scope.load = function(id) {
            $http.get('').success(function(data) { //grab self
                $scope.self = data;
            }).error(function(data) {

            });
            $http.get('&id=' + id). //TODO get URL
            success(function(data, status, headers, config) {
                $scope.posts = JSON.parse(data);
            }).
            error(function(data, status, headers, config) {
                //TODO error
                data = [{
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
                $scope.posts = data;
            });
        };
        $scope.load();
    }]);
app.controller('EditProfileController', ['$scope', '$http', '$rootScope', function($scope, $http , $rootScope) {
	$('#fuckthis').css('background-image' , 'url(/img/gray.jpg)');
        $scope.load = function() {
            $http.get('/').success(function(data, status, headers, config) {
                
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
                    phone_numbers: ['888-888-9999', '123-333-1111'],
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
                $scope.profile = data;
            });
};
$scope.load();
$scope.submit = function() {
    if ($scope.new_site_name != '' && $scope.new_site_url != '') {
        $scope.profile.sites.push({
            name: $scope.new_site_name,
            url: $scope.new_site_url
        });
    }
    if ($scope.new_phone_number != '') {
        $scope.profile.phone_numbers.push($scope.new_phone_number);
    }
    if ($scope.new_address != '') {
        $scope.profile.addresses.push($scope.new_address);
    }
    console.log($scope.profile);
    $http.post('http://wontonst.com', {
        profile: $scope.profile
    }).success(function(data, status, headers, config) {
        console.log(response);
                $location.path('/profile'); //TODO GET PROFILES URL
            }).error(function(data, status, headers, config) {
                $scope.emailTaken = true; //TODO maybe have two errors "conn bad" and "email taken"
            });
        };
    }]);
app.controller('RolodexController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {  
	
	$('#fuckthis').css('background-image' , 'url(/img/business.jpg)');
    $scope.cards = [];
    $scope.load = function() {
        $http.get('/').success(function(data, status, headers, config) {
            console.log(data);
        }).error(function(data, status, headers, config) {
            data = [{
                name: 'Roy Zheng',
                phone_number: '333-333-3333',
                address: '123 Easy St.',
                city: 'San Luis Obispo',
                state: 'CA',
                country: 'USA',
                site: 'www.lame.com',
                email: 'roi@roy.com'
            }, {
                name: 'James Flurry',
                site: 'www.lame.com',
                phone_number: '333-333-3333',
                address: '123 Easy St.',
                city: 'San Luis Obispo',
                state: 'CA',
                country: 'USA',
                email: 'roi@roy.com'
            }, {
                name: 'Blake Trillington',
                site: 'www.lame.com',
                phone_number: '333-333-3333',
                address: '123 Easy St.',
                city: 'San Luis Obispo',
                state: 'CA',
                country: 'USA',
                email: 'roi@roy.com'
            }, {
                name: 'Vlad Zhukov',
                site: 'www.lame.com',
                phone_number: '333-333-3333',
                address: '123 Easy St.',
                city: 'San Luis Obispo',
                state: 'CA',
                country: 'USA',
                email: 'roi@roy.com'
            }, {
                name: 'Gilberto Lomberto Jose Luis Garcia de Oaxaca',
                site: 'www.lame.com',
                phone_number: '333-333-3333',
                address: '123 Easy St.',
                city: 'San Luis Obispo',
                state: 'CA',
                country: 'USA',
                email: 'roi@roy.com'
            }];
            $scope.cards = data;
        });
};
$scope.load();
}]);
})();