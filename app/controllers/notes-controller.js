(function () {

    const {ipcRenderer} = require('electron');
    angular
        .module('myOnotes')
        .controller('notesController', ['$scope', '$mdDialog', '$mdToast', '$location', 'notesService', 'categoriesService', 'shortcutService', notesController]);

    function notesController($scope, $mdDialog, $mdToast, $location, notesService, categoriesService, shortcutService) {
        var vm = this,
            getNotes = function () {
                if (vm.currentCategory && vm.currentCategory.name) {
                    notesService.get(vm.currentCategory.name, function (notes) {
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
            getCategories = function () {
                categoriesService.getAll(function (categories) {
                    vm.categories = categories;
                });
            },
            updateName = function (noteId, noteName) {
                if (!noteName) {
                    addToast('Name cannot be empty...');
                    getNotes();
                    return;
                }

                notesService.updateName(noteId, noteName, function () {
                    addToast('Updated...');
                });
            },
            navigateToNoteInfo = function (noteId) {
                $location.path('/note-info/' + noteId);
            },
            addToast = function (message) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position('left')
                        .hideDelay(200));
            };


        shortcutService.removeAll();
        getCategories();
        // getNotes();

        vm.getNotes = getNotes;
        vm.addNote = addNote;
        vm.remove = rmeoveNote;
        vm.markAsDone = markAsDone;
        vm.updateName = updateName;
        vm.navigateToNoteInfo = navigateToNoteInfo;

        shortcutService.addShortcut("Ctrl+d", function () {
            if (!vm.currentCategory || !vm.currentCategory.name) {
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
                    .cancel('Cancel'))
                .then(function (result) {
                    if (result) {
                        notesService.add(vm.currentCategory.name, result);
                        getNotes();
                    } else {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Note name cannot be empty.')
                                .position('left')
                                .hideDelay(1000));
                    }
                });
        });

        shortcutService.addShortcut('Ctrl+g', function () {
            $mdDialog.show(
                $mdDialog.prompt()
                    .title('Add new category..')
                    .ok('Okay!')
                    .cancel('Cancel')).then(function (result) {
                        if (result) {
                            categoriesService.add(result);
                            getCategories();
                        } else {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Category name cannot be empty.')
                                    .position('left')
                                    .hideDelay(1000));
                        }
                    });
        });
    }
})();