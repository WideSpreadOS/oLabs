const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    category: String,
    sub_category: [String],
    body: String,
    added: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Note', NoteSchema);