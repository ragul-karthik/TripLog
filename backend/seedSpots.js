const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Spot = require('./models/Spot');

dotenv.config();

const spots = [
    {
      title: "Eiffel Tower",
      location: "Paris, France",
      category: "Monument",
      description: "Iconic wrought-iron tower in Paris, France.",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg"
    },
    {
      title: "Great Wall of China",
      location: "China",
      category: "Historical",
      description: "Historic fortification stretching across northern China.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/GreatWall_2004_Summer_4.jpg"
    },
    {
      title: "Taj Mahal",
      location: "Agra, India",
      category: "Cultural",
      description: "White marble mausoleum in Agra, India.",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg"
    },
    {
      title: "Statue of Liberty",
      location: "New York City, USA",
      category: "Monument",
      description: "Famous statue symbolizing freedom in the USA.",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg"
    },
    {
      title: "Colosseum",
      location: "Rome, Italy",
      category: "Historical",
      description: "Ancient Roman gladiatorial arena.",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg"
    },
    {
      title: "Santorini",
      location: "Greece",
      category: "Island",
      description: "A beautiful island with white-washed buildings and blue domes.",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Santorini_sunset.jpg"
    },
    {
      title: "Machu Picchu",
      location: "Peru",
      category: "Historical",
      description: "Ancient Incan citadel set high in the Andes Mountains.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg"
    },
    {
      title: "Grand Canyon",
      location: "Arizona, USA",
      category: "Natural Wonder",
      description: "Famous canyon known for its immense size and colorful landscape.",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Grand_Canyon_Hopi_Point_2010.jpg"
    },
    {
      title: "Sydney Opera House",
      location: "Sydney, Australia",
      category: "Cultural",
      description: "World-famous architectural masterpiece and performing arts center.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Sydney_Opera_House_-_Dec_2008.jpg"
    },
    {
      title: "Christ the Redeemer",
      location: "Rio de Janeiro, Brazil",
      category: "Monument",
      description: "Iconic statue of Jesus Christ overlooking the city.",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg"
    },
    {
      title: "Niagara Falls",
      location: "USA/Canada",
      category: "Natural Wonder",
      description: "Massive waterfalls on the border between the US and Canada.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Niagara_Falls_from_Prospect_Point_2013.jpg"
    },
    {
      title: "Burj Khalifa",
      location: "Dubai, UAE",
      category: "Skyscraper",
      description: "Tallest building in the world located in Dubai.",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Burj_Khalifa.jpg"
    },
    {
      title: "Stonehenge",
      location: "Wiltshire, England",
      category: "Historical",
      description: "Prehistoric stone circle monument.",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Stonehenge2007_07_30.jpg"
    },
    {
      title: "Angkor Wat",
      location: "Siem Reap, Cambodia",
      category: "Cultural",
      description: "Massive temple complex in Cambodia.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Angkor_Wat_temple.jpg"
    },
    {
      title: "Mount Fuji",
      location: "Honshu, Japan",
      category: "Natural Wonder",
      description: "Japan’s tallest mountain and iconic volcano.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Mount_Fuji_from_Hotel_Mt_Fuji_1997-10-26.jpg"
    },
    {
      title: "Petra",
      location: "Jordan",
      category: "Historical",
      description: "Archaeological site famous for rock-cut architecture.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Al_Khazneh_Petra_Edit_1.jpg"
    },
    {
      title: "Blue Lagoon",
      location: "Grindavík, Iceland",
      category: "Nature Spa",
      description: "Geothermal spa and one of Iceland’s most visited attractions.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Blue_Lagoon%2C_Iceland_%2835638792704%29.jpg"
    },
    {
      title: "Banff National Park",
      location: "Alberta, Canada",
      category: "Nature",
      description: "Scenic mountainous park with lakes, wildlife, and trails.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Moraine_Lake_17092005.jpg"
    },
    {
      title: "Pyramids of Giza",
      location: "Giza, Egypt",
      category: "Ancient Wonder",
      description: "Iconic pyramids built as royal tombs for the Pharaohs.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg"
    },
    {
      title: "Louvre Museum",
      location: "Paris, France",
      category: "Museum",
      description: "World’s largest art museum and a historic monument in Paris.",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Louvre_Museum_Wikimedia_Commons.jpg"
    }
  ];
  

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");
    await Spot.deleteMany(); // Optional: clears old data
    await Spot.insertMany(spots);
    console.log("Inserted spots!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Mongo error:", err);
    mongoose.disconnect();
  });
