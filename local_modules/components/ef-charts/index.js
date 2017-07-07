'use strict';

var angular = require('angular'),
    efPieChart = require('./ef-pie-chart.js'),
    efBarChart = require('./ef-bar-chart.js');

require('angular-nvd3');

module.exports = angular.module('ef-charts', ['nvd3'])
    .component('efPieChart', efPieChart)
    .component('efBarChart', efBarChart);