const mongoose = require('mongoose');
const apartmentsSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    roomID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms', 
    }],
    current_bookings:[]
}, {
    timestamps: true
})

const apartmentsModel = mongoose.model('Apartments', apartmentsSchema);
module.exports = apartmentsModel;