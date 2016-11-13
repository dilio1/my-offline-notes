(function () {
    var addedShortcuts = [];

    angular
        .module('myOnotes')
        .factory('shortcutService', [shortcutService]);

    function shortcutService() {
        var addShortcut = function (keyCombo, callback) {
            shortcut.add(keyCombo, callback);
            addedShortcuts.push(keyCombo);
        };

        var removeAll = function () {
            addedShortcuts.forEach(function (combo) {
                shortcut.remove(combo);
            });

            addedShortcuts = [];
        };

        return {
            addShortcut: addShortcut,
            removeAll: removeAll
        }
    };

} ());