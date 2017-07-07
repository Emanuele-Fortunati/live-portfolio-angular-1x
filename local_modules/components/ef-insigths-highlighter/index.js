'use strict';

var angular = require('angular'),
    efInsigthsHighlighter = require('./ef-insigths-highlighter.js');

module.exports = angular.module('ef-insigths-highlighter', [])
    //.component('efInsigthsHighlighter', efInsigthsHighlighter);
    .directive('efInsigthsHighlighter', efInsigthsHighlighter);