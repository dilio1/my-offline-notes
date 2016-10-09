(function(){

    var Datastore = require('nedb'),
        db = new Datastore({ filename: './storage/my-offline-notes.db', autoload: true });

    angular
        .module('myOnotes')
        .factory('notesService', [notesService]);

    function notesService() {
        var get = function(titleName, callback) {
        	db.find({title: titleName})
            .sort({ done: -1, createdAt: -1})
            .exec(function(err, notes) {
                if (err) {
                    callback(err);
                };

                callback(notes);
            });
        }

        var add = function(titleName, noteText) {
            var note = {
                createdAt: new Date(),
                text: noteText,
                title: titleName,
                done: false
            }

            db.insert(note, function(err, note) {
                if (err) {
                    console.log(err);
                }

                return note;
            });
        }

        var remove = function (noteId, callback) {
            db.remove({_id: noteId}, function (err, removedCount) {
                if (err) {
                    console.log(err);
                }
                callback(removedCount);
            });
        }

        var markAsDone = function (noteId, isDone, callback) {
            db.update({_id: noteId}, { $set: { done: isDone } }, function(err, numberOfUpdated) {
                if (err) {
                    console.log(err);
                }

                callback();
            });
        }

        return {
        	get: get,
        	add: add,
            remove: remove,
            markAsDone:markAsDone
        }
    };

}());