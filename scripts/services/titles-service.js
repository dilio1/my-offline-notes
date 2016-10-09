(function(){

    var Datastore = require('nedb'),
        db = new Datastore({ filename: './storage/my-offline-notes-titles.db', autoload: true });

    angular
        .module('myOnotes.services')
        .factory('titlesService', [titlesService]);

    function titlesService() {
        var getAll = function(callback) {
        	db.find({})
            .exec(function(err, titles) {
                if (err) {
                    callback(err);
                };

                callback(titles);
            });
        }

        var add = function(titleName) {
            var title = {
                createdAt: new Date(),
                name: titleName
            }

            db.insert(title, function(err, title) {
                if (err) {
                    console.log(err);
                }

                return title;
            });
        }

        return {
        	add: add,
            getAll: getAll
        }
    };

}());