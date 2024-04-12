const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

// connect to database
connectDB();

//middleware
app.use(cors());
app.use(express.json({ extended: false }));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/videogames", require("./routes/api/videogames"));
app.use("/api/games", require("./routes/api/gamestest"));

//serve static assets
if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5030;

app.listen(PORT, () => {
  console.log(`Server started on port localhost:port ${PORT}`);
});
