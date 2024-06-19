const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51ODvUNGOWeco0QiyUQAsMLnyNv4D3KsIWL6tB6OQSXzCPngMrvlPfN4k5UjPduBGb6hRJO14WhUULuTmJHpNuIAB00qK7XCcxS')

const BookingAp = require('../models/bookApartment');
const Apartment = require('../models/apartment');


router.post("/bookApartment", async (req, res) => {
    const {
        apartment,
        userID,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token
    } = req.body;



    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    })
    const payment = await stripe.charges.create(
        {
            amount: totalAmount * 100,
            customer: customer.id,
            currency: "RON",
            receipt_email: token.email
        },
        {
            idempotencyKey: uuidv4()
        }
    )

    if (payment) {

        try {
            const newBooking = new BookingAp({
                apartment: apartment.name,
                apartmentID: apartment._id,
                userID,
                fromDate,
                toDate,
                totalAmount,
                totalDays,
                transactionID: '1234'

            })
            const booking = await newBooking.save();

            const apartTemp = await Apartment.findOne({ _id: apartment._id });
            apartTemp.current_bookings.push({
                bookingID: booking._id,
                fromDate: fromDate,
                toDate: toDate,
                userID: userID,
                status: booking.status
            })
            await apartTemp.save()
            res.send('Booked Sucessfully')
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

});
router.post("/getbookingsbyuserid", async (req, res) => {
    const userID = req.body.userID
    try {

        const bookings = await BookingAp.find({ userID: userID })
        res.send(bookings)
    } catch (error) {

        return res.status(400).json({ error });

    }
});


router.post("/cancelbooking", async (req, res) => {

    const { bookingID, apartmentID } = req.body

    try {

        const bookingitem = await BookingAp.findOne({ _id: bookingID })
        bookingitem.status = 'cancelled'
        await bookingitem.save()
        const apartment = await Apartment.findOne({ _id: apartmentID })
        const bookings = apartment.current_bookings
        const temp = bookings.filter(booking => booking.bookingID.toString() !== bookingID)
        apartment.current_bookings = temp
        await apartment.save();
        res.send('Your booking cancelled successfully')


    } catch (error) {
        return res.status(400).json({ error });
    }

});


router.get("/getAllApartmentBookings", async (req, res) => {


    try {
        const bookings = await BookingAp.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const bookingApToDelete = await BookingAp.findByIdAndDelete(id);
      if (!bookingApToDelete) {
        return res.status(404).json({ message: "Apartment booking not found" });
      }
      res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
