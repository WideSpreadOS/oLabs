const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    complete: {
        type: Boolean,
        default: false
    },
    directions: [String],
    tools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    lifecycle: {
        created: {
            type: Date,
            default: Date.now()
        },
        completed: Date
    }
})


module.exports = mongoose.model('Task', TaskSchema);