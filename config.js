'use strict';

var config = function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.when('', '/');

    var homeState = {
        name: 'home',
        url: '/',
        component: 'home'
    }

    $stateProvider.state(homeState);

    $locationProvider.html5Mode(true);

};

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

module.exports = config;