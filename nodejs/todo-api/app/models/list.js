var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ListSchema = new Schema({
    
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    active: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('List', ListSchema);