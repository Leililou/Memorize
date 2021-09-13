const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
    question: { type: String },
    answer: { type: String },
    flashcardCollections: [{type: mongoose.Types.ObjectId, ref: 'flashcardCollection'}]
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
