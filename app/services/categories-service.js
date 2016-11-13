(function(){

    var Datastore = require('nedb'),
        db = new Datastore({ filename: './storage/my-offline-notes-titles.db', autoload: true });

    angular
        .module('myOnotes')
        .factory('categoriesService', [categoriesService]);

    function categoriesService() {
        var getAll = function(callback) {
        	db.find({})
            .exec(function(err, categories) {
                if (err) {
                    callback(err);
                };

                callback(categories);
            });
        };

        var add = function(categoryName) {
            var category = {
                createdAt: new Date(),
                name: categoryName
            }

            db.insert(category, function(err, category) {
                if (err) {
                    console.log(err);
                }

                return category;
            });
        };

        return {
        	add: add,
            getAll: getAll
        }
    };

}());