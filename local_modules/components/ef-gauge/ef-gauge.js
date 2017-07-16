'use strict';

var d3 = require('d3'),
    Gauge = require('./gauge');

var EfGaugeController = function($scope, $element, $attrs, $timeout) {
    var ctrl = this;

    ctrl.id = 'gauge-' + +new Date();

    // create chart in d3 -> original found here https://codepen.io/anon/pen/RgOKKx

    angular.element(function() {

        $timeout(function() {
            var margin = {
                top: 0,
                right: 50,
                bottom: 0,
                left: 0
            };
            Gauge(ctrl.id, ctrl.current, ctrl.max, ctrl.unit, margin);
        }, 100);
    });
    
}

EfGaugeController.$inject = ['$scope', '$element', '$attrs', '$timeout'];

var EfGauge = {
    templateUrl: './ef-gauge.html',
    controller: EfGaugeController,
    bindings: {
        max: '<',
        current: '<',
        unit: '<'
    }
};

module.exports = EfGauge;