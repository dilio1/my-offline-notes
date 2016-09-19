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

        var add = function(title, noteText) {
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

        var addNote = function (title, noteText) {
            var note = {
                createdAt: new Date(),
                text: noteText,
                done: false
            }

            db.update({title: title}, { $push: { notes: note } }, function(err, note) {
                if (err) {
                    console.log(err);
                }

                return note;
            });
        }

        var addTitle = function (title) {
            var title = {
                title: title,
                notes: []
            };

            db.insert(title, function(err, title) {
                if (err) {
                    console.log(err);
                }

                return title;
            });
        }

        var getTitles = function (callback) {
            db.find({})
            .projection({ title: 1 })
            .exec(function(err, titles) {
                if (err) {
                    callback(err);
                };

                callback(titles);
            });
        }

        return {
        	get: get,
        	add: add,
            remove: remove,
            markAsDone:markAsDone,
            addNote: addNote,
            addTitle: addTitle,
            getTitles: getTitles
        }
    };

}());