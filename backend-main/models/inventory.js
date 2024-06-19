const mongoose = require("mongoose");
const inventorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    roomID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms", // The model name should match the one used in the Room model
    },
  },
  {
    timestamps: true,
  }
);

const inventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = inventoryModel;
