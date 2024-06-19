const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Room = require("../models/room");
const Inventory = require("../models/inventory");
const Facilities = require("../models/facilities");
const Supplies = require("../models/supplies");
const Apartments = require("../models/apartment");

router.get("/getAllRooms", async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("inventoryID")
      .populate("suppliesID")
      .populate("facilitiesID");
    res.status(200).json(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate("inventoryID")
      .populate("suppliesID")
      .populate("facilitiesID");
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getInventoryById", async (req, res) => {
  const { inventoryID } = req.body;

  try {
    const inventory = await Inventory.findOne({ _id: inventoryID });

    res.send(inventory);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getFacilitiesById", async (req, res) => {
  const { facilitiesID } = req.body;

  try {
    const facilities = await Facilities.findOne({ _id: facilitiesID });

    res.send(facilities);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addRoom", async (req, res) => {
  try {
    // Extract room details from request body
    const {
      room_number,
      number_of_beds,
      image_urls,
      current_bookings,
      inventoryID,
      suppliesID,
      facilitiesID,
      apartmentID,
    } = req.body;

    // Create a new room document
    const newRoom = new Room({
      room_number,
      number_of_beds,
      image_urls,
      current_bookings,
      inventoryID,
      suppliesID,
      facilitiesID,
      apartmentID,
    });

    // Save the room to the database
    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;

    // Find the room by ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Update room details
    room.room_number = req.body.room_number || room.room_number;
    room.number_of_beds = req.body.number_of_beds || room.number_of_beds;
    room.image_urls = req.body.image_urls || room.image_urls;
    room.current_bookings = req.body.current_bookings || room.current_bookings;
    room.inventoryID = req.body.inventoryID || room.inventoryID;
    room.suppliesID = req.body.suppliesID || room.suppliesID;
    room.facilitiesID = req.body.facilitiesID || room.facilitiesID;
    room.apartmentID = req.body.apartmentID || room.apartmentID;

    // Save the updated room to the database
    const updatedRoom = await room.save();

    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const roomToDelete = await Room.findByIdAndDelete(id);
    if (!roomToDelete) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.sendStatus(200); // Send 200 status code upon successful deletion
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/* get all inventories endpoint*/
router.get("/inventories/getAllInventories", async (req, res) => {
  try {
    const inv = await Inventory.find();

    res.status(200).json(inv);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
/* get all facilities endpoint*/
router.get("/facilities/getAllFacilities", async (req, res) => {
  try {
    const facilities = await Facilities.find();

    res.status(200).json(facilities);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
/* get all supplies endpoint*/
router.get("/supplies/getAllSupplies", async (req, res) => {
  try {
    const supplies = await Supplies.find();

    res.status(200).json(supplies);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
