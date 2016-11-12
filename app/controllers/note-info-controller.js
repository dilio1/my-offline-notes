(function () {

    angular
        .module('myOnotes')
        .controller('noteInfoController', ['$scope', '$routeParams', '$location', 'notesService', 'categoriesService', noteInfoController]);

    function noteInfoController($scope, $routeParams, $location, notesService, categoriesService) {
        var vm = this,
            currentNoteId = $routeParams.noteId,
            getNote = function () {
                notesService.getSingle(currentNoteId, function (note) {
                    $scope.$apply(vm.currentNote = note);
                });
            },
            navigateHome = function () {
                $location.path('/');
            };


        getNote();
        vm.navigateHome = navigateHome;
    }

})();