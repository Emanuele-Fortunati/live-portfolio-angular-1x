'use strict';

var DialogController = function($scope, $mdDialog) {
    var ctrl = this;

    ctrl.content = 'info';
    ctrl.title = 'More about me';

    ctrl.cancel = function() {
        $mdDialog.hide();
    };

    ctrl.openContact = function() {
        ctrl.content = 'contact';
        ctrl.title = 'Get in touch';
    }
}
DialogController.$inject = ['$scope', '$mdDialog'];

var EfInfoController = function($scope, $element, $attrs, $mdDialog) {
    var ctrl = this;

    ctrl.openInfo = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            controllerAs: 'dialog',
            bindToController: true,
            templateUrl: 'ef-info-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        });
    };


}

EfInfoController.$inject = ['$scope', '$element', '$attrs', '$mdDialog'];

var EfInfo = {
    templateUrl: './ef-info.html',
    controller: EfInfoController
};

module.exports = EfInfo;