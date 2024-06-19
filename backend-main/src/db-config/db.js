const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO;
mongoose.connect(mongoURL);
const connection = mongoose.connection;

connection.on("error", () => console.log("Connection FAILED!"));
connection.on("connected", () => console.log("Connection OK!"));

module.exports = mongoose;
