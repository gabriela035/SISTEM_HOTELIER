const mongoose = require('mongoose');
const suppliesSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms',
    },
}, {
    timestamps: true
})

const suppliesModel = mongoose.model('Supplies', suppliesSchema);
module.exports = suppliesModel;