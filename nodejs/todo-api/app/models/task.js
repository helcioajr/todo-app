var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema({

    list: {
        type: Schema.Types.ObjectId,
        ref: "List"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title:   String,
    completed: Boolean,
    created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Task', TaskSchema);