(function() {
    var app = angular.module('qred-profile', ['ngRoute', 'LocalStorageModule']);
    app.config(function($routeProvider, localStorageServiceProvider) {

        localStorageServiceProvider
            .setPrefix('qred');

        $routeProvider.when('/', {
                templateUrl: '/directives/profile.html',
            })
            .when('/profile', {
                templateUrl: '/directives/profile.html',
            })
            .when('/my', {
                templateUrl: '/directives/mycard.html',
            })
            .when('/edit', {
                templateUrl: '/directives/edit_profile.html',
            })
            .when('/wall', {
                templateUrl: '/directives/wall.html',
            });
    });
    app.controller('BrowseController', ['$scope', '$rootScope', 'localStorageService', function($scope, $rootScope, localStorageService) {
        localStorageService.set('test', '400');
        console.log(localStorageService.keys(), localStorageService.get('token'));
    }]);

    app.controller('ProfileController', ['$scope', '$rootScope', '$http', 'localStorageService', function($scope, $rootScope, $http, localStorageService) {

        $('#fuckthis').css('background-image', 'url(/img/desk.jpg)');
        $scope.profile = {};
        $scope.load = function() {
            // $http.get('&id=' + id). //TODO get URL
            $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('token');
            $http.get('/api/v1/users/me').success(function(data, status, headers, config) {
                data = data.entities[0];
                $scope.profile = data;
                $scope.profile.email = data.username;
                $scope.profile.address = ((data.addresses != null) && (data.addresses.length > 0) ? data.addresses[0]: '');
                $scope.profile.phone_number = ((data.phone_numbers != null) && (data.phone_numbers.length > 0) ? data.phone_numbers[0] : '');
                $scope.profile.site = ((data.sites != null) && (data.sites.length > 0) ? data.sites[0].url : '');
                $scope.profile.qrurl = "http://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=http%3A%2F%2Fqred.cloudapp.net%2Fbrowse.html%3Fid%3D" + data.uuid;

                splitname = data.name.split(" ");
                vc = "BEGIN:VCARD\nVERSION:3.0\n";
                vc += "N:" + splitname[1] + ";" + splitname[0] + "\n";
                vc += "FN:" + splitname[0] + "\n";
                vc += "EMAIL:" + $scope.profile.email + "\n";
                vc += "TEL;TYPE=HOME:" + $scope.profile.phone_number + "\n";
                vc += "END:VCARD";
                vc = encodeURIComponent(vc);

                $scope.profile.qrcontact = ("http://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=" + vc);
                
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
                    qrurl: "qred.azurewebsites.net/browse.html"

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
                    pic: $scope.self.pic
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
    app.controller('EditProfileController', ['$scope', '$http', '$location', '$rootScope', 'localStorageService', function($scope, $http, $location, $rootScope, localStorageService) {
        $('#fuckthis').css('background-image', 'url(/img/gray.jpg)');
        $scope.load = function() {
            // $http.defaults.headers.common.Authorization = localStorageService.get('token');
            // $http.get('/api/v1/users/me').success(function(data, status, headers, config) {
            //     $scope.profile = data;
            $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('token');
            $http.get('/api/v1/users/me').success(function(data, status, headers, config) {
                data = data.entities[0];
                $scope.profile = data;
                $scope.profile.email = data.username;
                $scope.profile.address = ((data.addresses != null) && (data.addresses.length > 0) ? data.addresses[0]: '');
                $scope.profile.phone_number = ((data.phone_numbers != null) && (data.phone_numbers.length > 0) ? data.phone_numbers[0] : '');
                $scope.profile.site = ((data.sites != null) && (data.sites.length > 0) ? data.sites[0].url : '');
                $scope.profile.qrurl = "http://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=http://qred.cloudapp.net/browse.html?id=" + data.uuid;

                splitname = data.name.split(" ");
                vc = "BEGIN:VCARD\nVERSION:3.0\n";
                vc += "N:" + splitname[1] + ";" + splitname[0] + "\n";
                vc += "FN:" + splitname[0] + "\n";
                vc += "EMAIL:" + $scope.profile.email + "\n";
                vc += "TEL;TYPE=HOME:" + $scope.profile.phone_number + "\n";
                vc += "END:VCARD";
                vc = encodeURIComponent(vc);

                $scope.profile.qrcontact = ("http://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=" + vc);
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
                if($scope.profile.sites == null){
                    $scope.profile.sites = [];
                }
                $scope.profile.sites.push({
                    name: $scope.new_site_name,
                    url: $scope.new_site_url
                });
            }
            if ($scope.new_phone_number != '') {
                if($scope.profile.phone_numbers == null){
                    $scope.profile.phone_numbers = [];
                }
                $scope.profile.phone_numbers.push($scope.new_phone_number);
            }
            if ($scope.new_address != '') {
                if($scope.profile.addresses == null){
                    $scope.profile.addresses = [];
                }
                $scope.profile.addresses.push($scope.new_address);
            }
            console.log($scope.profile);
            $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('token');
            $http.put('/api/v1/users/me', {
                // profile: $scope.profile
                entities[0].name: profile.name;
                entities[0].username: profile.email;                
                entities[0].phone_numbers = profile.phone_numbers;
                
            }).success(function(data, status, headers, config) {
                $location.path('/profile'); //TODO GET PROFILES URL
            }).error(function(data, status, headers, config) {
                $scope.emailTaken = true; //TODO maybe have two errors "conn bad" and "email taken"
            });
        };
    }]);
    app.controller('RolodexController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

        $('#fuckthis').css('background-image', 'url(/img/business.jpg)');
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