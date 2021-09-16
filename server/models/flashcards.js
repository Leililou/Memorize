const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
    question: { type: String },
    answer: { type: String },
    hint: {type: String},
    createdBy: {type: mongoose.Types.ObjectId, ref: 'Users'},
    //flashcardCollections: [{type: mongoose.Types.ObjectId, ref: 'FlashcardCollections'}]
});

module.exports = mongoose.model('Flashcards', flashcardSchema);
