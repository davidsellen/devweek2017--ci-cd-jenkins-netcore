﻿// Write your JavaScript code.
var app = angular.module('app', []).config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://*:*/**'
    ]);
   
});


app.controller('NavController', ['$scope', '$q', ($scope, $q) => {

    $scope.title = "DevWeek 2017";
}]);



app.controller('HomeController', ['$scope', '$http', '$interval', '$sce', ($scope, $http, $interval, $sce) => {

    let privList = [];

    $scope.url = "";
    $scope.list = [];

    $scope.enqueue = () => {
        $http({
            method: 'POST',
            url: '/api/Enqueue',
            data: {
                OriginalMediaUrl: $scope.url
            }
        }).then(function successCallback(response) {
            alert("Ok! Seu vídeo está em processamento...");
            $scope.url = "";
        }, function errorCallback(response) {
            alert("Algo não deu muito certo!");
        });
    };

    $interval(() => {
        $http({
            method: 'GET',
            url: '/api/Enqueue',
            data: {}
        }).then(function successCallback(response) {
            Enumerable.From(privList).ForEach(it => { delete it.$$hashKey; });
            if (JSON.stringify(response.data) != JSON.stringify(privList)) {
                privList = response.data;
                $scope.list = response.data;
            }
        }, function errorCallback(response) {
        });

    }, 500)


}]);