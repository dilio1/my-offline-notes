(function () {

    var Datastore = require('nedb'),
        db = new Datastore({ filename: './storage/my-offline-notes.db', autoload: true });

    angular
        .module('myOnotes')
        .factory('notesService', [notesService]);

    function notesService() {
        var get = function (categoryName, callback) {
            db.find({ category: categoryName })
                .sort({ done: -1, createdAt: -1 })
                .exec(function (err, notes) {
                    if (err) {
                        callback(err);
                    };

                    callback(notes);
                });
        };

        var getSingle = function (noteId, callback) {
            db.findOne({ _id: noteId }, function (err, note) {
                if (err) {
                    console.log(err);
                }
                callback(note);
            });
        };

        var add = function (categoryName, noteName) {
            var note = {
                createdAt: new Date(),
                name: noteName,
                text: '',
                category: categoryName,
                done: false
            }

            db.insert(note, function (err, note) {
                if (err) {
                    console.log(err);
                }

                return note;
            });
        };

        var remove = function (noteId, callback) {
            db.remove({ _id: noteId }, function (err, removedCount) {
                if (err) {
                    console.log(err);
                }
                callback(removedCount);
            });
        };

        var markAsDone = function (noteId, isDone, callback) {
            db.update({ _id: noteId }, { $set: { done: isDone } }, function (err, numberOfUpdated) {
                if (err) {
                    console.log(err);
                }

                callback();
            });
        };

        var update = function (note, callback){
            db.update({ _id: note._id }, {"$set": note}, {}, function (err, numberOfUpdated) {
                if (err) {
                    console.log(err);
                }

                callback();
            });
        };

        return {
            get: get,
            getSingle: getSingle,
            add: add,
            remove: remove,
            markAsDone: markAsDone,
            update: update
        }
    };

} ());