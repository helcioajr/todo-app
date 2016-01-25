var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    content: String,
    completed: Boolean,
    created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Task', TaskSchema);