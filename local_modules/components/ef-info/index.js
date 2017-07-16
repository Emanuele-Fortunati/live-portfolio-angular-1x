'use strict';

var angular = require('angular'),
    efInfo = require('./ef-info.js');

require('angular-material');
require('components/ef-contact');

module.exports = angular.module('ef-info', ['ngMaterial', 'ef-contact'])
    .component('efInfo', efInfo);