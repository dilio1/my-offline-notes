(function () {

    const {ipcRenderer} = require('electron');
    angular
        .module('myOnotes')
        .controller('notesController', ['$scope', '$mdDialog', '$location', 'notesService', 'titlesService', notesController]);

    function notesController($scope, $mdDialog, $location, notesService, titlesService) {
        var vm = this,
            getNotes = function () {
                if (vm.currentTitle && vm.currentTitle.name) {
                    notesService.get(vm.currentTitle.name, function (notes) {
                        $scope.$apply(vm.notes = notes);
                    });
                }
            },
            addNote = function () {
                notesService.add(vm.inputNote);
                vm.inputNote = null;
                getNotes();
            },
            markAsDone = function (noteId, isDone) {
                notesService.markAsDone(noteId, isDone, function () {
                    getNotes();
                });
            },
            rmeoveNote = function (noteId) {
                notesService.remove(noteId, function () {
                    getNotes();
                });
            },
            getTitles = function () {
                titlesService.getAll(function (titles) {
                    vm.titles = titles;
                });
            },
            navigateToNoteInfo = function (noteId) {
                $location.path('/note-info/' + noteId);
            };


        getTitles();
        // getNotes();

        vm.getNotes = getNotes;
        vm.addNote = addNote;
        vm.remove = rmeoveNote;
        vm.markAsDone = markAsDone;
        vm.navigateToNoteInfo = navigateToNoteInfo;

        ipcRenderer.on('add-title', function () {
            $mdDialog.show(
                $mdDialog.prompt()
                    .title('Add new title..')
                    .ok('Okay!')
                    .cancel('Cancel')).then(function (result) {
                        titlesService.add(result);
                        getTitles();
                    });
        });

        ipcRenderer.on('add-note', function () {
            if (!vm.currentTitle || !vm.currentTitle.name) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .title('Cannot add notes before selecting a list..')
                        .ok('Okay!'));
                return;
            }

            $mdDialog.show(
                $mdDialog.prompt()
                    .title('Add new note..')
                    .ok('Okay!')
                    .cancel('Cancel')).then(function (result) {
                        notesService.add(vm.currentTitle.name, result);
                        getNotes();
                    });
        });
    }

})();