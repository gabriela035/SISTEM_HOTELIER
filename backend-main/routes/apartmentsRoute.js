const express = require("express");
const router = express.Router();
const Apartments = require('../models/apartment');



router.get("/getAllApartments", async (req, res) => {
    try {

        const apartments = await Apartments.find().populate('roomID')
        res.status(200).json(apartments);

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});
router.get("/:id", async (req, res) => {
   
    try {
        const apartment = await Apartments.findById(req.params.id).populate('roomID');
        res.send(apartment)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/addApartment', async (req, res) => {
    try {
        // Extract apartment details from request body
        const { name, roomID, current_bookings } = req.body;

        // Create a new apartment document
        const newApartment = new Apartments({
            name,
            roomID,
            current_bookings
        });

        // Save the apartment to the database
        const savedApartment = await newApartment.save();

        res.status(201).json(savedApartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const apartmentId = req.params.id;
        const { name, roomID, current_bookings } = req.body;

        // Find the apartment by ID
        let apartment = await Apartments.findById(apartmentId);

        if (!apartment) {
            return res.status(404).json({ message: "Apartment not found" });
        }

        // Update apartment details
        apartment.name = name || apartment.name;
        apartment.roomID = roomID || apartment.roomID;
        apartment.current_bookings = current_bookings || apartment.current_bookings;

        // Save the updated apartment to the database
        const updatedApartment = await apartment.save();

        res.status(200).json(updatedApartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const apartmentToDelete = await Apartments.findByIdAndDelete(id);
      if (!apartmentToDelete) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

module.exports = router;