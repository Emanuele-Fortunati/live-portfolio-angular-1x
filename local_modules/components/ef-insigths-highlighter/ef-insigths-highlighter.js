'use strict';

var angular = require('angular');

var EfInsigthsHighlighterLink = function(scope, element, attrs) {

    var elements = angular.element(element).find('span'),
        $highlighter,
        $insigths = angular.element(element).find('div');

    elements.on('click', function() {
        if(!angular.element(this).hasClass('highlighter')) {
            $highlighter.removeClass('clicked');
            elements.removeClass('blurry');
            $insigths.removeClass('open');
        }
    });

    for(var i = 0; i < elements.length; i++) {
        if(angular.element(elements[i]).hasClass('highlighter')) {
            $highlighter = angular.element(elements[i]);

            $highlighter.on('mouseover', function() {
                elements.addClass('blurry')
                $highlighter.removeClass('blurry');
            });
            $highlighter.on('mouseout', function() {
                if(!$highlighter.hasClass('clicked')) {
                    elements.removeClass('blurry');
                }
            });
            $highlighter.on('click', function() {
                elements.addClass('blurry');
                $highlighter
                    .removeClass('blurry')
                    .toggleClass('clicked');
                $insigths.toggleClass('open');
            });

            break;
        }
    }

}
EfInsigthsHighlighterLink.$inject = ['scope, element, attrs'];


var EfInsigthsHighlighter = function() {
    return {
        link: EfInsigthsHighlighterLink
    };
}
EfInsigthsHighlighter.$inject = [];

module.exports = EfInsigthsHighlighter;