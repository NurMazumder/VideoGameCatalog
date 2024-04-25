const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API working");
});

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/videogames", require("./routes/api/videogames"));
app.use("/api/games", require("./routes/api/gamesTest"));
app.use("/api/wishlist", require("./routes/api/wishlist"));

const PORT = process.env.PORT || 5030;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});