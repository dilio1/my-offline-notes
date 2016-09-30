(function(){
   
    const {ipcRenderer} = require('electron');
    angular
        .module('myOnotes.controllers')
        .controller('notesController', ['$scope', "$mdDialog", '$element', 'notesService', notesController]);

    function notesController($scope, $mdDialog, $element, notesService) {
        var vm = this,
            getNotes = function() {
                notesService.get(vm.selectedTitle, function (result) {
                    $scope.$apply(vm.notes = result.notes);
                });
            },
            addNote = function () {
                notesService.add(vm.selectedTitle, vm.inputNote);
                vm.inputNote = null;
                getNotes();
            },
            markAsDone = function (noteId, note) {
                notesService.markAsDone(noteId, note, function() {
                    getNotes();
                });
            },
            rmeoveNote = function (noteId) {
                notesService.remove(noteId, function () {
                    getNotes();
                });
            },
            getTitles = function () {
                notesService.getTitles(function (titles) {
                    $scope.$apply(vm.titles = titles);
                });
            },
            addTitles = function (title) {
                notesService.addTitle(vm.inputNote);
                notesService();
            };

        // getNotes();
        getTitles();
        vm.addNote = addNote;
        vm.remove = rmeoveNote;
        vm.markAsDone = markAsDone;
        vm.getNotes = getNotes;

        ipcRenderer.on('add-title', function() {
             $mdDialog.show(
                $mdDialog.prompt()
                .title('Add new title..')
                .ok('Okay!')
                .cancel('Cancel')).then(function(result) {
                    notesService.addTitle(result);
                    getTitles();
                });
        });

        ipcRenderer.on('add-note', function() {
            if (!vm.selectedTitle) {
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
                .cancel('Cancel')).then(function(result) {
                    notesService.addNote(vm.selectedTitle, result);
                    getNotes();
                });
        });
    }

})();