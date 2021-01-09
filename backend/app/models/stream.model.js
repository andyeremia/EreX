const mongoose = require("mongoose");

const Stream = mongoose.model(
  "Stream",
  new mongoose.Schema({
    owner: String,
    title: String,
    description: String,
  })
);

module.exports = Stream;
