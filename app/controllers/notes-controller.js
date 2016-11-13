(function() {

    const {ipcRenderer} = require('electron');
    angular
        .module('myOnotes')
        .controller('notesController', ['$scope', '$mdDialog', '$mdToast', '$location', 'notesService', 'categoriesService', 'shortcutService', 'settingsService', 'loaderService', notesController]);

    function notesController($scope, $mdDialog, $mdToast, $location, notesService, categoriesService, shortcutService, settingsService, loaderService) {
        var vm = this,
            getNotes = function() {
                if (vm.currentCategory && vm.currentCategory.name) {
                    notesService.get(vm.currentCategory.name, function(notes) {
                        $scope.$apply(vm.notes = notes);
                    });
                }
            },
            addNote = function() {
                notesService.add(vm.inputNote);
                vm.inputNote = null;
                getNotes();
            },
            markAsDone = function(noteId, isDone) {
                notesService.markAsDone(noteId, isDone, function() {
                    getNotes();
                });
            },
            rmeoveNote = function(noteId) {
                notesService.remove(noteId, function() {
                    getNotes();
                });
            },
            getCategories = function() {
                categoriesService.getAll(function(categories) {
                    vm.categories = categories;
                });
            },
            updateName = function(noteId, noteName) {
                if (!noteName) {
                    addToast('Name cannot be empty...');
                    getNotes();
                    return;
                }

                notesService.updateName(noteId, noteName, function() {
                    addToast('Updated...');
                });
            },
            navigateToNoteInfo = function(noteId) {
                $location.path('/note-info/' + noteId);
            },
            addToast = function(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position('left')
                        .hideDelay(200));
            },
            handleChangeCategory = function(categoryName) {
                if (!categoryName) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Category name cannot be empty.')
                            .position('left')
                            .hideDelay(1000));
                    return;
                }

                var preselectedCategory = vm.categories.find(function(category) {
                    return category.name === categoryName;
                });

                if (!preselectedCategory) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Category does not exists...')
                            .position('left')
                            .hideDelay(1000));
                    return;
                }

                vm.currentCategory = preselectedCategory;
                settingsService.updateLastSelectedCategory(preselectedCategory.name);
                getNotes();
            },
            init = function() {
                shortcutService.removeAll();
                settingsService.getSettings(function(settings) {
                    categoriesService.getAll(function(categories) {
                        var preselectedCategory = categories.find(function(category) {
                            return category.name === settings.lastSelectedCategory;
                        });

                        vm.categories = categories;
                        if (preselectedCategory) {
                            vm.currentCategory = preselectedCategory;
                        } else {
                            vm.currentCategory = categories[0];
                        }

                        getNotes();
                    });
                });
            };

        init();
        // getCategories();
        // getNotes();

        vm.getNotes = getNotes;
        vm.addNote = addNote;
        vm.remove = rmeoveNote;
        vm.markAsDone = markAsDone;
        vm.updateName = updateName;
        vm.navigateToNoteInfo = navigateToNoteInfo;

        shortcutService.addShortcut("Ctrl+d", function() {
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
                .then(function(result) {
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

        shortcutService.addShortcut('Ctrl+g', function() {
            $mdDialog.show(
                $mdDialog.prompt()
                    .title('Add new category..')
                    .ok('Okay!')
                    .cancel('Cancel')).then(function(result) {
                        if (result) {
                            loaderService.showLoader();
                            categoriesService.add(result, function(newCategory) {
                                settingsService.updateLastSelectedCategory(newCategory.name, function() {
                                    vm.currentCategory = newCategory;
                                    loaderService.hideLoader();
                                    getNotes();
                                });
                            });
                        } else {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Category name cannot be empty.')
                                    .position('left')
                                    .hideDelay(1000));
                        }
                    });
        });

        shortcutService.addShortcut('Ctrl+space', function() {
            $mdDialog.show(
                $mdDialog.prompt()
                    .title('Change category..')
                    .ok('Okay!')
                    .cancel('Cancel')).then(function(result) {
                        handleChangeCategory(result);
                    });
        });
    }
})();