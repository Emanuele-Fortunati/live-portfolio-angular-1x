'use strict';

var angular = require('angular'),
    efFlyingMenu = require('./ef-flying-menu.js');

require('components/ef-button');

module.exports = angular.module('ef-flying-menu', ['ef-button'])
    .component('efFlyingMenu', efFlyingMenu);