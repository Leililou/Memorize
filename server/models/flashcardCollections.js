var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flashcardCollectionSchema = new Schema({
    name: {type: String},
    flashcards: [{type: mongoose.Types.ObjectId, ref: 'flashcards'}]
});

module.exports = mongoose.model('flashcardCollections', flashcardCollectionSchema);
