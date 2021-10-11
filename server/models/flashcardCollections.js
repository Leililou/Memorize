var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flashcardCollectionSchema = new Schema({
    name: {type: String},
    desc: {type: String},
    flashcards: [{type: mongoose.Types.ObjectId, ref: 'flashcards'}],
    createdBy: {type: mongoose.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('flashcardCollections', flashcardCollectionSchema);
