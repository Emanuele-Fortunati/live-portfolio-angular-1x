'use strict';

var angular = require('angular'),
    efImage2svg = require('./ef-image2svg.js');

module.exports = angular.module('ef-image2svg', [])
    .component('efImage2svg', efImage2svg);