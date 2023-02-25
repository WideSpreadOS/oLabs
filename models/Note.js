const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    category: String,
    sub_category: [String],
    tags: [String],
    body: String,
    resrources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
    url_images: [String],
    images: [String],
    importance: Number,
    added: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Note', NoteSchema);