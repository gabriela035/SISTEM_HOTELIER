const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({

    room_number: {
        type: Number,
        required: true
    },
    number_of_beds: {
        type: Number,
        required: true
    },
    image_urls: [],
    current_bookings: [],
    inventoryID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
    }],
    suppliesID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplies',
    }],
    facilitiesID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facilities',
    }],
    apartmentID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartments',
    }],

}, {
    timestamps: true
})

const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel;