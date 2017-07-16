'use strict';

var angular = require('angular'),
    jQuery = require('jquery');

// @TODO make it up without jQuery
// It should be possible with angular animations

// Inspired by the work of Weepy
// https://github.com/weepy/jquery.path
var V = {
    rotate: function(p, degrees) {
      var radians = degrees * 3.141592654 / 180
      var c = Math.cos(radians), s = Math.sin(radians)
      return [c*p[0] - s*p[1], s*p[0] + c*p[1] ]
    },
    scale: function(p, n) {
      return [n*p[0], n*p[1]]
    },
    add: function(a, b) {
      return [a[0]+b[0], a[1]+b[1]]
    },
    minus: function(a, b) {
      return [a[0]-b[0], a[1]-b[1]]
    }
}

var bezier = function( params ) {
    params.start = jQuery.extend({angle: 0, length: 0.3333}, params.start )
    params.end   = jQuery.extend({angle: 0, length: 0.3333}, params.end )

    this.p1 = [params.start.x, params.start.y];
    this.p4 = [params.end.x, params.end.y];

    var v14 = V.minus(this.p4, this.p1)
    var v12 = V.scale(v14, params.start.length)
    v12 = V.rotate(v12, params.start.angle)
    this.p2 = V.add(this.p1, v12)

    var v41 = V.scale(v14, -1)
    var v43 = V.scale(v41, params.end.length)
    v43 = V.rotate(v43, params.end.angle)
    this.p3 = V.add(this.p4, v43)

    this.f1 = function(t) { return (t*t*t); }
    this.f2 = function(t) { return (3*t*t*(1-t)); }
    this.f3 = function(t) { return (3*t*(1-t)*(1-t)); }
    this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); }

     /* p from 0 to 1 */
    this.css = function(p) {
       var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p)
       var x = this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4;
       var y = this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4;
       return {top: y + 'px', left: x + 'px'}
    }
}



jQuery.fx.step.path = function(fx) {
    var css = fx.end.css( 1 - fx.pos );
    if ( css.prevX != null ) {
        jQuery.cssHooks.transform.set( fx.elem, 'rotate(' + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ')' );
    }
    fx.elem.style.top = css.top;
    fx.elem.style.left = css.left;
};

jQuery.fn.flyTo = function(destination, topInc, leftInc, speed, delay, callback) {

    var $this = this,
        $destination = jQuery(destination),
        newPos = $destination.position(),
        coord = {
            start: {
                x: $this.offset().left,
                y: $this.offset().top,
                angle: -20,
                length: 0.3
            },
            end: {
                x: newPos.left + leftInc,
                y: newPos.top + topInc,
                angle: 20,
                length: 0.2
            }
        };


    setTimeout(function() {
        $this.find('div').removeClass('open');
        var $new = $this.clone();
        $this.remove();

        $new.css({
            position: 'absolute',
            left: coord.start.x + 'px',
            top: coord.start.y + 'px'
        }).appendTo(document.body).delay(delay).animate({
                path : new bezier(coord)
            }, {
            duration: speed,

            complete: function() {
                setTimeout(function() {
                    $new.remove();
                }, 250);
            }
        })

    }, 10);

    return $destination;
};



var DialogController = function($scope, $mdDialog) {
    var ctrl = this;

    ctrl.cancel = function() {
        $mdDialog.hide();
    };
}
DialogController.$inject = ['$scope', '$mdDialog'];

var EfFlyingButtonController = function($scope, $element, $attrs, $timeout, $mdDialog, $document) {
    var ctrl = this,

        destination = $element.find('div')[0], // @TODO - dont trust dom position!
        speed = 250,

        $menuToggle = angular.element($element.find('div').children()[0]),

        $buttonContainer = $element.find('ef-button').parent();

    ctrl.buttonsVisible = false;

    angular.element(function() {
        ctrl.isOpen = ctrl.isOpen;
    });


    ctrl.toggleMenu = function() {
        ctrl.buttonsVisible = !ctrl.buttonsVisible;
    };

    ctrl.learnMore = function() {        
        var delay = 0,
            $buttons = $element.find('ef-button');

        for(var i = 0; i < $buttons.length; i++) {
            var $source = $buttons[i];

            if(angular.element($source).hasClass('visible')) {
                jQuery($source).flyTo(destination,  0, 0, speed, delay);
                delay += 80;
            }

        }

        // show hamburger
        $menuToggle.removeClass('invisible');

        // toggle menu (close it)
        $timeout(function() {
            $menuToggle.find('input').attr('checked', false);
            ctrl.didFly = true;

            ctrl.scrollToSection(ctrl.scrollTo);

        }, delay + 500);

    }

    ctrl.downloadCV = function() {
        window.open('http://themissingtile.com/emanuele-fortunati-front-end-developer-cv.pdf');
    }

    ctrl.getInTouch = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            controllerAs: 'dialog',
            bindToController: true,
            templateUrl: 'ef-contact-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        });        
    }

    ctrl.scrollToSection = function(section) {
        try {
            $document.scrollToElementAnimated(angular.element(document.getElementsByClassName(section)));
        } catch(e) {}
        
    }

    // all menus has to behave same way
    ctrl.$onChanges = function(changes) {
        if(changes.forceFlying && changes.forceFlying.currentValue === true) {
            if(!ctrl.didFly) {
                this.learnMore();
            }
        }
    }

}

EfFlyingButtonController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$mdDialog', '$document'];

var EfFlyingButton = {
    templateUrl: './ef-flying-menu.html',
    controller: EfFlyingButtonController,
    bindings: {
        isOpen: '<',
        didFly: '=',
        forceFlying: '<',
        scrollTo: '@'
    }
};

module.exports = EfFlyingButton;