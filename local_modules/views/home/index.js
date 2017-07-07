'use strict';

var angular = require('angular'),
    homeView = require('./home');

require('components/ef-image2svg');
require('components/ef-flying-menu');
require('components/ef-charts');
require('components/ef-insigths-highlighter');

module.exports = angular.module('home-view', ['ef-image2svg', 'ef-flying-menu', 'ef-charts', 'ef-insigths-highlighter'])
    .component('home', homeView);