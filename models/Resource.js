const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name: String,
    category: String,
    main_url: String,
    urls: [{
        title: String,
        target: {
            type: String,
            required: true
        },
        target_type: String
    }],
    sub_category: [String],
    added: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Resource', ResourceSchema);