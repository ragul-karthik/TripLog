const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  username: String,
  title: String,
  caption: String,
  image: String,
  tags: [String],
  usefulVotes: { type: Number, default: 0 },
  hasVoted: { type: Boolean, default: false },
  saved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Experience", ExperienceSchema);
