const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Spot = require("./models/Spot");
const Experience = require("./models/Experience");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB using the URI from the .env file
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.error("MongoDB connection error:", err)
  );

// ------------------------- API Routes -------------------------

// Fetch all spots
app.get("/api/spots", async (req, res) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch spots" });
  }
});

// Fetch all experiences, sorted by newest first
app.get("/api/experiences", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
});

// Add a new spot (expects JSON data in request body)
app.post("/api/spots", async (req, res) => {
  try {
    const newSpot = new Spot(req.body);
    await newSpot.save();
    res.status(201).json(newSpot);
  } catch (err) {
    res.status(500).json({ error: "Could not add spot." });
  }
});

// Add a new experience (expects JSON data in request body)
app.post("/api/experiences", async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(500).json({ error: "Could not add experience." });
  }
});

// Mark an experience as useful (only once per experience)
app.post("/api/experiences/:id/useful", async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    if (experience.hasVoted) {
      return res.status(400).json({ error: "Already voted" });
    }
    experience.usefulVotes += 1;
    experience.hasVoted = true;
    await experience.save();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: "Could not update vote." });
  }
});

// Mark an experience as saved
app.post("/api/experiences/:id/save", async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    experience.saved = true;
    await experience.save();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: "Could not update saved status." });
  }
});

// Fetch all experiences that have been marked as saved
app.get("/api/experiences/saved", async (req, res) => {
  try {
    const experiences = await Experience.find({ saved: true });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch saved experiences." });
  }
});

// (Optional) Add a comment to an experience
app.post("/api/experiences/:id/comment", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, text } = req.body;
    if (!username || !text) {
      return res.status(400).json({ error: "Username and text are required." });
    }
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    experience.comments.push({ username, text, createdAt: new Date() });
    await experience.save();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: "Could not add comment." });
  }
});

// -------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
