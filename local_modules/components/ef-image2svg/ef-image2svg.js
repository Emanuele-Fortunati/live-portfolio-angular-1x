'use strict';

var ImageTracer = require('imagetracerjs');
//use angular.element(callback)

var EfImage2SvgController = function($scope, $element, $attrs, $timeout) {
    var ctrl = this,
        $image = $element.find('img'),

        minColors = 6,
        maxColors = 8,
        step = 1,

        speed = 1,

        options = {
            numberofcolors: maxColors,
            colorquantcycles: 5,
            pathomit: 5
        },

        trace = function(timeout, traceCallback) {

            $timeout(function() {
                ImageTracer.imageToSVG( ctrl.src, function(svgstr) {

                    $image.attr('src', 'data:image/svg+xml;utf8,' + svgstr);

                    traceCallback(timeout);

                }, options );
            }, timeout);

        },

        traceCallback = function(timeout) {

            options.numberofcolors+=step;
            if(ctrl.animate && options.numberofcolors < maxColors) {
                trace(ctrl.animate? timeout : 0, traceCallback);
            }

        };

    // init
    angular.element(function() {

        maxColors = +ctrl.maxColors || maxColors;
        minColors = +ctrl.minColors || minColors;
        step = +ctrl.step || step;

        $timeout(function() {
            $image.attr('src', ctrl.src);

            if(ctrl.animate) {
               options.numberofcolors = minColors;
            }

            trace(ctrl.animate? speed : 0, traceCallback);
        }, 1);
    });

}

EfImage2SvgController.$inject = ['$scope', '$element', '$attrs', '$timeout'];

var EfImage2Svg = {
    templateUrl: './ef-image2svg.html',
    controller: EfImage2SvgController,
    bindings: {
        src: '@',
        animate: '@',
        maxColors: '@',
        minColors: '@',
        step: '@'
    }
};

module.exports = EfImage2Svg;