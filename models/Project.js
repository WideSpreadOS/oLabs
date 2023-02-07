const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    importance_scale: Number,
    to_do: [{
        completed: {
            type: Boolean,
            default: false
        },
        body: String,
        created: {
            type: Date,
            default: Date.now()
        }
    }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    code: [String],
    category: String,
    sub_category: [String],
    added: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Project', ProjectSchema);