(function() {
    var addedShortcuts = [];

    angular
        .module('myOnotes')
        .service('loaderService', loaderService);

    loaderService.$inject = ['$mdDialog', '$rootScope'];
    function loaderService($mdDialog, $rootScope) {
        var showLoader = function() {
            $mdDialog.show({
                template: '<md-dialog style="background-color:transparent;box-shadow:none;overflow: hidden">' +
                '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
                ' <md-progress-circular class="loader md-hue-2" md-diameter="100px"></md-progress-circular>' +
                '</div>' +
                '</md-dialog>',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false
            })
                .then(function(answer) {
                });
        };

        var hideLoader = function() {
            setTimeout(function() {
                $mdDialog.cancel();
            }, 5);
        };

        return {
            showLoader: showLoader,
            hideLoader: hideLoader
        }
    };

} ());