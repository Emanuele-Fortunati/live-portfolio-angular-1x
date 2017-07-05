'use strict';

var angular = require('angular'),
    ImageTracer = require('imagetracerjs');


var EfImageController = function($scope, $element, $attrs, $timeout) {
    var ctrl = this,
        $image = $element.find('img'),

        minColors = 2,
        maxColors = ctrl.maxColors || 8,

        speed = 10,

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

            options.numberofcolors++;
            if(ctrl.animate && options.numberofcolors < maxColors) {
                trace(ctrl.animate? timeout : 0, traceCallback);
            }

        };

    // init
    $timeout(function() {
        $image.attr('src', ctrl.src);

        if(ctrl.animate) {
           options.numberofcolors = minColors;
        }

        trace(ctrl.animate? speed : 0, traceCallback);
    }, 1);

}

EfImageController.$inject = ['$scope', '$element', '$attrs', '$timeout'];

var imageController = {
    templateUrl: './ef-image2svg.html',
    controller: EfImageController,
    bindings: {
        src: '@',
        animate: '@',
        maxColors: '@'
    }
};

module.exports = imageController;