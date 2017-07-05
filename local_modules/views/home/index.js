'use strict';

var angular = require('angular'),
    homeView = require('./home');

require('components/ef-image2svg');

module.exports = angular.module('homeView', ['ef-image2svg'])
    .component('home', homeView);