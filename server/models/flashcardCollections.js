var mongoose = require('mongoose');
const flashcards = require('./flashcards');
var Schema = mongoose.Schema;

var flashcardCollectionSchema = new Schema({
    name: {type: String},
    flashcards: [{type: mongoose.Types.ObjectId, ref: 'Flashcards'}],
    //numberOfCards: {type: Number, ref: flashcards.length}
});

module.exports = mongoose.model('FlashcardCollections', flashcardCollectionSchema);
