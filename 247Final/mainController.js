'use strict';

var cs247App = angular.module('cs142App', ['ngRoute', 'ngMaterial']);

cs247App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/1', {
                templateUrl: 'components/none/no-picture.html',
                controller: 'NoPictureController'
            }).
            when('/2', {
                templateUrl: 'components/lifelike/lifelike.html',
                controller: 'LifelikeController'
            }).
            when('/3', {
                templateUrl: 'components/abstract/abstract.html',
                controller: 'AbstractController'
            }).
            otherwise({
                redirectTo: '/1'
            });
    }]);

cs247App.controller('MainController', ['$scope',
    function ($scope) {
        /*Any variables we need defined HERE*/
    }]);