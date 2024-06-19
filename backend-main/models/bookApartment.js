const mongoose=require('mongoose');

const bookingApartmentSchema=mongoose.Schema({
    apartment:{
        type:String,
        required:true
    },
    apartmentID:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    fromDate:{
        type:String,
        required:true
    },
    toDate:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    totalDays:{
        type:Number,
        required:true
    },
    transactionID:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'booked'
    },
},{
    timestamps:true,
});


const bookingApartmentModel = mongoose.model('BookingsApartment', bookingApartmentSchema);
module.exports = bookingApartmentModel;