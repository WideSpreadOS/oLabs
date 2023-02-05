const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    category: String,
    sub_category: [String],
    body: [
        {
            header: String,
            content: String,
            resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }
        }
    ],
    added: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Note', NoteSchema);