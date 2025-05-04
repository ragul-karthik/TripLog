const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
  title: String,
  location: String,
  category: String,
  description: String,
  image: String
});

module.exports = mongoose.model("Spot", SpotSchema);
