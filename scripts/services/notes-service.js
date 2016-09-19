(function(){

    var Datastore = require('nedb'),
        db = new Datastore({ filename: 'my-offline-notes.db', autoload: true });

    angular
        .module('myOnotes.services')
        .factory('notesService', [notesService]);

    function notesService() {
        var get = function(callback) {
        	db.find({})
            .sort({ done: -1, createdAt: -1})
            .exec(function(err, notes) {
                if (err) {
                    callback(err);
                };

                callback(notes);
            });
        }

        var add = function(noteText) {
            var note = {
                createdAt: new Date(),
                text: noteText,
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

        var markAsDone = function (noteId, note, callback) {
            db.update({_id: noteId}, { text: note.text, done: note.done, createdAt: note.createdAt}, function(err, numberOfUpdated) {
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