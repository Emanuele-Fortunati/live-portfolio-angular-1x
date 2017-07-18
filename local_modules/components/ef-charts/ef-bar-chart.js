'use strict';

var angular = require('angular');

var EfBarChartController = function($scope, $element, $attrs, $timeout) {
    var ctrl = this,
        animationDuration = 500,
        height = 250;

    ctrl.api = undefined;

    var draw = function(noDelay) {
        $timeout(function() {
            for(var i = 0; i < ctrl.values.length; i++) {
                ctrl.data[0].values[i].value = ctrl.values[i];
            }
        }, noDelay === true? 0 : (animationDuration + 10));
    }

    angular.element(function() {

        ctrl.options = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: ctrl.height || height,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                groupSpacing: ctrl.groupSpacing || 0.7 ,
                showControls: false,
                showValues: false,
                duration: height,
                xAxis: {
                    showMaxMin: false
                },
                showYAxis: false,
                showLegend: false,
                yDomain: ctrl.yDomain || [0, 100],
                margin: {
                    top: 30,
                    bottom: 30,
                    left: 160,
                    right: 30
                },
                // color: function(d, i) {
                //     return d.forceColor;
                // },                
                tooltip: {
                    contentGenerator: function(d, i) {

                        var insights = '<tr><td colspan="2" class="key">' + d.data.insights + '</td></tr>';

                        return '<table><tbody><tr><td class="legend-color-guide"></td><td>' + d.data.label + '</td></tr>' + insights + '</tbody></table>';
                    },
                    classes: ['ef-charts-tooltip']
                }
            }
        }

        ctrl.data = [{
            //key: "Series1",
            //"color": "#d62728",
            values: []
        }];

        var invertedValues = [];

        for(var i = 0; i < ctrl.values.length; i++) {
            ctrl.data[0].values.push({
                label: ctrl.labels[i],
                value: 0,
                insights: ctrl.insights[i]
            });
            invertedValues.push(ctrl.values[i]);
        }

        invertedValues.reverse();

        draw(false);

    });

    ctrl.$onChanges = function(changes) {
        if(changes.drawOn && changes.drawOn.currentValue === true && changes.drawOn.previousValue !== true) {
            draw(false);
        }
    }    

}

EfBarChartController.$inject = ['$scope', '$element', '$attrs', '$timeout'];

var EfBarChart = {
    templateUrl: './ef-charts.html',
    controller: EfBarChartController,
    bindings: {
        height: '<',
        yDomain: '<',
        values: '<',
        labels: '<',
        insights: '<',
        groupSpacing: '<',
        drawOn: '<'
    }
};

module.exports = EfBarChart;