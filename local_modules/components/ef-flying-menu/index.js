'use strict';

var angular = require('angular'),
    efFlyingMenu = require('./ef-flying-menu.js');

require('components/ef-button');
require('angular-scroll');

module.exports = angular.module('ef-flying-menu', ['ef-button', 'duScroll'])
    .component('efFlyingMenu', efFlyingMenu);