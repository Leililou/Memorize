const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String },
    password: { type: String },
    //ownedFlashcards: [{type: mongoose.Types.ObjectId, ref: 'Flashcards'}]
});

module.exports = mongoose.model('Users', userSchema);
