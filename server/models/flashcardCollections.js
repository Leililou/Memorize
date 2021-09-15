var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flashcardCollectionSchema = new Schema({
    subject: {type: String},
    flashcards: [{type: mongoose.Types.ObjectId, ref: 'Flashcards'}]
});

module.exports = mongoose.model('flashcardCollections', flashcardCollectionSchema);
