var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flashcardCollectionSchema = new Schema({
    subject: {type: String},
    flashcards: [{type: mongoose.Types.ObjectId, ref: 'Flashcard'}]
});

module.exports = mongoose.model('flashcardCollection', flashcardCollectionSchema);
