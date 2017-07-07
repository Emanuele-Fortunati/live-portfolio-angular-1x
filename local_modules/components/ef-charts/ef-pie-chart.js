'use strict';

var angular = require('angular');

var EfPieChartController = function($scope, $element, $attrs, $timeout) {
    var ctrl = this,
        animationDuration = 500;

    ctrl.api = undefined;

    angular.element(function() {

        ctrl.options = {
            'chart': {
                type: 'pieChart',
                "height": 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: animationDuration,
                labelThreshold: 0.01,
                cornerRadius: true,
                donut: false,
                donutRatio: 0.1,
                labelSunbeamLayout: false,
                labelsOutside: true,
                showLegend: false,
                tooltip: {
                    contentGenerator: function(d, i) {

                        var insights = '<tr><td colspan="2" class="key">' + d.data.insights.join('</td></tr><tr><td colspan="2" class="key">') + '</td></tr>';

                        return '<table><tbody><tr><td class="legend-color-guide"><div style="background-color: ' + d.color + ';"></div></td><td class="value">' + d.data.key + '</td></tr>' + insights + '</tbody></table>';
                    }
                },
                dispatch: {
                    stateChange: function (t, u) {

                    },
                    changeState: function (t, u) {

                    },
                    renderEnd: function (t, u) {
                        var elements = angular.element(ctrl.api.getElement()).find('g'),
                            first = true;
                        for(var i = 0; i < elements.length; i++) {

                            if(angular.element(elements[i]).hasClass('nv-slice')) {
                                //angular.element(elements[i]).css('transform', 'translate(10px, 10px)');
                                if(first) {
                                    first = false;
                                } else {
                                    angular.element(elements[i]).css('transform', 'scale(' + (1 + 0.01 * i * Math.random()) + ')');
                                }
                            }

                        }
                    }
                }
            }
        }

        ctrl.data = [];

        var invertedValues = [];

        for(var i = 0; i < ctrl.values.length; i++) {
            ctrl.data.push({
                key: ctrl.labels[i],
                y: 0,
                insights: ctrl.insights[i]
            });
            invertedValues.push(ctrl.values[i]);
        }

        invertedValues.reverse();

/*
        $timeout(function() {
            for(var i = 0; i < ctrl.values.length; i++) {
                ctrl.data[i].y = invertedValues[i]
            }

            $timeout(function() {
                for(var i = 0; i < ctrl.values.length; i++) {
                    ctrl.data[i].y = ctrl.values[i];
                }
            }, animationDuration + 10);

        }, 150);
*/

        $timeout(function() {
            for(var i = 0; i < ctrl.values.length; i++) {
                ctrl.data[i].y = ctrl.values[i];
            }
        }, animationDuration + 10);

    });

}

EfPieChartController.$inject = ['$scope', '$element', '$attrs', '$timeout'];

var EfPieChart = {
    templateUrl: './ef-charts.html',
    controller: EfPieChartController,
    bindings: {
        type: '@',
        values: '<',
        labels: '<',
        insights: '<'
    }
};

module.exports = EfPieChart;