'use strict';

var angular = require('angular'),
    efButton = require('./ef-button.js');

require('angular-material');

module.exports = angular.module('ef-button', ['ngMaterial'])
    .component('efButton', efButton);