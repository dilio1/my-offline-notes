(function () {

    var Datastore = require('nedb'),
        db = new Datastore({ filename: './storage/my-offline-notes-titles.db', autoload: true });

    angular
        .module('myOnotes')
        .factory('categoriesService', [categoriesService]);

    function categoriesService() {
        var getAll = function (callback) {
            db.find({})
                .exec(function (err, categories) {
                    if (err) {
                        callback(err);
                    };

                    callback(categories);
                });
        };

        var add = function (categoryName, callback) {
            var category = {
                createdAt: new Date(),
                name: categoryName
            }

            db.insert(category, function (err, category) {
                if (err) {
                    console.log(err);
                }

                callback(category);
            });
        };

        var remove = function (categoryId, callback) {
            db.remove({ _id: categoryId }, function (err, removedCount) {
                if (err) {
                    console.log(err);
                }
                callback(removedCount);
            });
        };

        return {
            add: add,
            getAll: getAll,
            remove: remove
        }
    };

} ());