const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path"); // Adjusted import for consistency
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/videogames", require("./routes/api/videogames"));
app.use("/api/games", require("./routes/api/games"));
app.use("/api/reviews", require("./routes/api/reviews"));
app.use("/api/wishlist", require("./routes/api/wishlist"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Adjust the path to correctly serve the static files
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

  // Catch-all handler to serve React's index.html for any non-API route
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "dist", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5030;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
