(function () {

    require('../src-min/ace');
    angular
        .module('myOnotes')
        .controller('categoriesController', ['$scope', '$mdDialog', '$location', 'notesService', 'categoriesService', 'shortcutService', 'settingsService', 'loaderService', categoriesController]);

    function categoriesController($scope, $mdDialog, $location, notesService, categoriesService, shortcutService, settingsService, loaderService) {
        var vm = this,
            editor,
            getCategories = function () {
                categoriesService.getAll(function (categories) {
                    $scope.$apply(vm.categories = categories);
                });
            },
            selectCategory = function (categoryName) {
                loaderService.showLoader();
                settingsService.updateLastSelectedCategory(categoryName, function () {
                    loaderService.hideLoader();
                    $location.path('/');
                });
            },
            addCategory = function (categoryName) {
                loaderService.showLoader();
                categoriesService.add(categoryName, function () {
                    settingsService.updateLastSelectedCategory(categoryName, function () {
                        loaderService.hideLoader();
                        $location.path('/');
                    });
                });
            },
            removeCategory = function (category) {
                $mdDialog.show(
                    $mdDialog.confirm()
                        .title('Deleting category deletes all notes!!')
                        .ok('Okay!')
                        .cancel('Cancel'))
                    .then(function (result) {
                        loaderService.showLoader();
                        categoriesService.remove(category._id, function () {
                            notesService.removeByCategory(category.name, function () {
                                loaderService.hideLoader();
                                getCategories();
                            });
                        });
                    }, function (){
                        getCategories();
                    });
            };

        shortcutService.removeAll();
        getCategories();
        vm.addCategory = addCategory;
        vm.selectCategory = selectCategory;
        vm.removeCategory = removeCategory;
    }

})();