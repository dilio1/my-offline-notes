(function () {
    var Datastore = require('nedb'),
        db = new Datastore({ filename: './storage/my-offline-notes-settings.db', autoload: true });

    angular
        .module('myOnotes')
        .factory('settingsService', [settingsService]);

    function settingsService() {
        var getSettings = function (callback) {
            db.findOne({})
                .exec(function (err, settings) {
                    if (err) {
                        callback(err);
                    };

                    callback(settings);
                });
        };

        var updateLastSelectedCategory = function (categoryName, callback) {
            db.update({}, { $set: { lastSelectedCategory: categoryName } }, {}, function (err, numberOfUpdated) {
                if (err) {
                    console.log(err);
                }

                if (callback) {
                    callback();
                }
            });
        };

        var enshureSettingsExists = function () {
            var initialSettings = {
                lastSelectedCategory: ''
            };

            getSettings(function (settings) {
                if (settings === null) {
                    db.insert(initialSettings, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        };

        return {
            updateLastSelectedCategory: updateLastSelectedCategory,
            getSettings: getSettings,
            enshureSettingsExists: enshureSettingsExists
        }
    };

} ());