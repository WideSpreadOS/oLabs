const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    data: {
        name: String,
        item_type: String,
        description: String,
        category: String,
        sub_category: [String],
        dimensions: {
            w: String,
            h: String,
            d: String
        },
        weight: {
            measurment: String,
            mass: String
        },
        price: String,
        photos: [String],
        videos: [String],
        urls: {
            main_url: String,
            product: String,
            specs: String,
            other: [{
                label: String,
                link: String
            }]

        },
        inventory: {
            bin_location: {
                x: Number,
                y: Number,
                bin_data: {
                    color: String,
                    size: {
                        w: String,
                        h: String,
                        d: String
                    }
                }
            },
            in_stock: Number,
            reorder_limit: Number,
            in_use: Number,
            in_plans: Number
        }

    },
    qr: {
        image_data: {
            src: String,
            data_item_id: String
        }
    },
    connections: {
        parent_item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        child_items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
        documentation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
        notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
    },
    added: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Item', ItemSchema);