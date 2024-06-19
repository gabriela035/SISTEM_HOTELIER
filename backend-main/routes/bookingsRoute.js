const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51ODvUNGOWeco0QiyUQAsMLnyNv4D3KsIWL6tB6OQSXzCPngMrvlPfN4k5UjPduBGb6hRJO14WhUULuTmJHpNuIAB00qK7XCcxS')

const Booking = require('../models/booking');
const Room = require('../models/room');


router.post("/bookroom", async (req, res) => {
    const {
        room,
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
            const newBooking = new Booking({
                room: room.room_number,
                roomID: room._id,
                userID,
                fromDate,
                toDate,
                totalAmount,
                totalDays,
                transactionID: '1234'

            })
            const booking = await newBooking.save();

            const roomTemp = await Room.findOne({ _id: room._id });
            roomTemp.current_bookings.push({
                bookingID: booking._id,
                fromDate: fromDate,
                toDate: toDate,
                userID: userID,
                status: booking.status
            })
            await roomTemp.save()
            res.send('Booked Sucessfully')
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

});
router.post("/getbookingsbyuserid", async (req, res) => {


    const userID = req.body.userID


    try {

        const bookings = await Booking.find({ userID: userID })
        res.send(bookings)
    } catch (error) {

        return res.status(400).json({ error });

    }
});
router.post("/cancelbooking", async (req, res) => {

    const { bookingID, roomID } = req.body

    try {

        const bookingitem = await Booking.findOne({ _id: bookingID })
        bookingitem.status = 'cancelled'
        await bookingitem.save()
        const room = await Room.findOne({ _id: roomID })
        const bookings = room.current_bookings
        const temp = bookings.filter(booking => booking.bookingID.toString() !== bookingID)
        room.current_bookings = temp
        await room.save();
        res.send('Your booking has been cancelled successfully!')


    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.get("/getallbookings", async (req, res) => {


    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const bookingToDelete = await Booking.findByIdAndDelete(id);
      if (!bookingToDelete) {
        return res.status(404).json({ message: "Room booking not found" });
      }
      res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });


module.exports = router;
