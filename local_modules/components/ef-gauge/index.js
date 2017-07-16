'use strict';

var angular = require('angular'),
    efGauge = require('./ef-gauge.js');

module.exports = angular.module('ef-gauge', [])
    .component('efGauge', efGauge);