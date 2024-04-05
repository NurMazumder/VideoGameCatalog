const express = require("express");
const router = express.Router();
const Game = require("../../models/GamesTest");

// @route   GET api/testgames
// @review  Get a list of all video games
// @access  Public
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/testgames/popular
// @review  Get sorted games by popularity
// @access  Public
router.get("/popular", async (req, res) => {
  try {
    const games = await Game.find().sort({ ratingsCount: -1 }).limit(10);
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/testgames/newrelease
// @review  Get sorted games by release date
// @access  Public
router.get("/newrelease", async (req, res) => {
  try {
    const games = await Game.find().sort({ released: -1 }).limit(10);
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/testgames/:id
// @review  Get details of a specific video game by its id
// @access  Public
router.get("/id/:id", async (req, res) => {
  try {
    const game = await Game.findOne({ rawg_id: req.params.id });
    if (!game) {
      return res.status(404).json({ msg: "Video game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Video game not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   GET api/testgames/search
// @review  Get games by a search filter
// @access  Public
router.get("/search/:search", async (req, res) => {
  try {
    const searchQuery = req.params.search;
    const regex = new RegExp(searchQuery.split(" ").join("|"), "i");
    const filteredGames = await Game.find({
      $or: [
        { game_name: regex },
        { game_tags: regex },
        { game_genres: regex },
        { game_platforms: regex },
      ],
    });
    res.json(filteredGames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
