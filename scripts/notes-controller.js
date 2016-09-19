(function(){
   
    const {ipcRenderer} = require('electron');
    angular
        .module('myOnotes.controllers')
        .controller('notesController', ['$scope', "$mdDialog", '$element', 'notesService', notesController]);

    function notesController($scope, $mdDialog, $element, notesService) {
        var vm = this,
            getNotes = function() {
                notesService.get(function (notes) {
                    $scope.$apply(vm.notes = notes);
                });
            },
            addNote = function () {
                notesService.add(vm.inputNote);
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

        vm.notes = [
            {
                text: 1
            },
            {
                text: 'wd'
            }
        ];

        ipcRenderer.on('global-shortcut', function() {
             $mdDialog.show(
                $mdDialog.prompt()
                .title('Add new note..')
                .ok('Okay!')
                .cancel('Cancel')).then(function(result) {
                    notesService.addTitle(result);
                    getTitles();
                });
        });
    }

})();