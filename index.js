'use strict';

var angular = require('angular'),
    LivePortfolioConfig = require('./config')

// core dependencies
require('angular-material');
require('angular-messages');
require('angular-ui-router');

// views
require('views/home');

// init
angular.module('LivePortfolio', ['ngMaterial', 'ngMessages', 'ui.router', 'homeView'])
    .config(LivePortfolioConfig);