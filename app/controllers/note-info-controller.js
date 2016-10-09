(function () {

    angular
        .module('myOnotes')
        .controller('noteInfoController', ['$scope', '$routeParams', '$location', 'notesService', 'titlesService', noteInfoController]);

    function noteInfoController($scope, $routeParams, $location, notesService, titlesService) {
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