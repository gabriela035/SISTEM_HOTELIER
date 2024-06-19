const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    CNP: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true
    },
   isAdmin:{
    type:Boolean,
    default:false
   },
   favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rooms',
}],
   favouritesApartments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartments',
}],

}, {
    timestamps: true
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;