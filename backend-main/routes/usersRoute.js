const express = require("express");
const router = express.Router();

const User = require("../models/user");
const roomModel = require("../models/room");

router.get("/getAllUsers", async (req, res) => {
  try {
    const user = await User.find().populate("favourites").select("-password");
    res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/register", async (req, res) => {
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    CNP: req.body.CNP,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newUser.save();
    res.send("user registered !");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json({ message: "Login failed!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addUser", async (req, res) => {
  try {
    const { first_name, last_name, CNP, address, email, password, isAdmin } =
      req.body;

    const user = new User({
      first_name,
      last_name,
      CNP,
      address,
      email,
      password,
      isAdmin,
    });

    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findByIdAndDelete(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/:userId/favorites/:roomId", async (req, res) => {
  const { userId, roomId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the room is already in favorites
    if (user.favourites.includes(roomId)) {
      return res
        .status(400)
        .json({ success: false, message: "Room already in favorites" });
    }

    // Add the room to favorites
    user.favourites.push(roomId);

    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Room added to favorites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/:userId/favorites-remove/:roomId", async (req, res) => {
  const { userId, roomId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the room is already in favorites
    if (user.favourites.includes(roomId)) {
      user.favourites.remove(roomId);
    }

    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Room added to favorites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/getAllFavorites/:userId", async (req, res) => {
  
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favourites");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    //   const user = await User.findById(req.params.id);
    return res.status(200).json({ success: true, favorites: user.favourites });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


router.put("/:id", async (req, res) => {
  //EDIT user by ID
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.CNP = req.body.CNP || user.CNP;
    user.address = req.body.address || user.address;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post("/:userId/favorites-apartments/:apartmentId", async (req, res) => {
  const { userId, apartmentId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.favouritesApartments.includes(apartmentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Apartment already in favorites" });
    }

    user.favouritesApartments.push(apartmentId);

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Apartment added to favorites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


router.post("/:userId/favorites-apartments-remove/:apartmentId", async (req, res) => {
  const { userId, apartmentId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the room is already in favorites
    if (user.favouritesApartments.includes(apartmentId)) {
      user.favouritesApartments.remove(apartmentId);
    }

    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Apartment removed from favorites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/getAllFavorites-apartments/:userId", async (req, res) => {
  //get fav apartments by user ID
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favouritesApartments");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    //   const user = await User.findById(req.params.id);
    return res
      .status(200)
      .json({ success: true, favouritesApartments: user.favouritesApartments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
