'use strict';

var EfButtonController = function($scope, $element, $attrs) {
    var ctrl = this;

}

EfButtonController.$inject = ['$scope', '$element', '$attrs'];

var EfButton = {
    templateUrl: './ef-button.html',
    controller: EfButtonController,
    bindings: {
        text: '@',
        icon: '@',
        isOpen: '<',
        onClick: '&'
    }
};

module.exports = EfButton;