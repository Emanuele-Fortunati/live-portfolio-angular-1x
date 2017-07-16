'use strict';

var angular = require('angular'),
    efContact = require('./ef-contact.js'),
    efGauge = require('../ef-gauge');

require('angular-material');

module.exports = angular.module('ef-contact', ['ngMaterial', 'ef-gauge'])
    .component('efContact', efContact);