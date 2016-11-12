(function () {

    require('../src-min/ace');
    angular
        .module('myOnotes')
        .controller('noteInfoController', ['$scope', '$routeParams', '$location', '$mdToast', 'notesService', 'categoriesService', noteInfoController]);

    function noteInfoController($scope, $routeParams, $location, $mdToast, notesService, categoriesService) {
        var vm = this,
            editor,
            currentNoteId = $routeParams.noteId,
            getNote = function () {
                notesService.getSingle(currentNoteId, function (note) {
                    $scope.$apply(function () {
                        vm.currentNote = note;
                        editor.setValue(vm.currentNote.text);
                    });
                });
            },
            updateNote = function () {
                vm.currentNote.text = editor.getValue();
                notesService.update(vm.currentNote, function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Saved...')
                            .position('left')
                            .hideDelay(200));
                });
            },
            navigateHome = function () {
                $location.path('/');
            },
            initEditor = function () {
                editor = ace.edit('editor');
                editor.getSession();
            };


        shortcut.add("Ctrl+s", function () {
            updateNote();
        });

        initEditor();
        getNote();
        vm.navigateHome = navigateHome;
    }

})();