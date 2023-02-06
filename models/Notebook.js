const mongoose = require('mongoose');

const NotebookSchema = new mongoose.Schema({
    title: String,
    category: String,
    sub_category: [String],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    created: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Notebook', NotebookSchema);