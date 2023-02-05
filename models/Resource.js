const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name: String,
    category: String,
    main_url: String,
    urls: [String],
    sub_category: [String],
    added: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Resource', ResourceSchema);