var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalCollectionSchema = new Schema({
    name: {type: String},
    description: {type: String},
    importanceRating: {type: Number},
    status: {type: String},
    createdBy: {type: mongoose.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('goals', goalCollectionSchema);
