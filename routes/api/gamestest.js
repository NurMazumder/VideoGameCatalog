const express = require("express");
const router = express.Router();
const Game = require("../../models/GamesTest");

const auth = require("../../middleware/auth");

// @route   GET api/games
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

// @route   GET api/games/popular
// @review  Get games sorted by popularity
// @access  Public
router.get("/popular", async (req, res) => {
  try {
    let games;
    if (req.query.count) {
      games = await Game.find()
        .sort({
          game_ratings_count: -1,
          game_rating: -1,
        })
        .limit(parseInt(req.query.count));
    } else {
      games = await Game.find().sort({
        game_ratings_count: -1,
      });
    }
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/unpopular
// @review  Get games sorted by popularity by least to most
// @access  Public
router.get("/unpopular", async (req, res) => {
  try {
    let games;
    if (req.query.count) {
      games = await Game.find()
        .sort({
          game_ratings_count: 1,
          game_rating: 1,
        })
        .limit(parseInt(req.query.count));
    } else {
      games = await Game.find().sort({
        game_ratings_count: 1,
      });
    }
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/newrelease
// @review  Get games sorted by release date
// @access  Public
router.get("/newest", async (req, res) => {
  try {
    let games;
    if (req.query.count) {
      games = await Game.find()
        .sort({
          game_released: -1,
          game_ratings_count: -1,
          game_rating: -1,
        })
        .limit(parseInt(req.query.count));
    } else {
      games = await Game.find().sort({
        game_released: -1,
      });
    }
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/oldrelease
// @review  Get games sorted by release date from oldest to newest
// @access  Public
router.get("/oldest", async (req, res) => {
  try {
    let games;
    if (req.query.count) {
      games = await Game.find()
        .sort({
          game_released: 1,
          game_ratings_count: -1,
          game_rating: -1,
        })
        .limit(parseInt(req.query.count));
    } else {
      games = await Game.find().sort({
        game_released: 1,
      });
    }
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/action
// @review  Get action games
// @access  Public
router.get("/action", async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const games = await Game.find({ game_genres: "Action" })
      .sort({ game_rating: -1 })
      .limit(count);
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/rpg
// @review  Get rpg games
// @access  Public
router.get("/rpg", async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const games = await Game.find({ game_genres: "RPG" })
      .sort({ game_rating: -1 })
      .limit(count);
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/shooter
// @review  Get rpg games
// @access  Public
router.get("/shooter", async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const games = await Game.find({ game_genres: "Shooter" })
      .sort({ game_rating: -1 })
      .limit(count);
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/:id
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

// @route   GET api/games/search/name
// @review  Get games by a name filter
// @access  Public
router.get("/search/name/:search", async (req, res) => {
  try {
    const searchQuery = req.params.search;
    const regex = new RegExp(searchQuery.split(" ").join("|"), "i");
    const filteredGames = await Game.find({ game_name: regex });
    res.json(filteredGames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/search/genre
// @review  Get games by a genre filter
// @access  Public
router.get("/search/genre/:search", async (req, res) => {
  try {
    const searchQuery = req.params.search;
    const genres = searchQuery.split(" ");
    const regexArray = genres.map((genre) => new RegExp(genre, "i"));
    const filteredGames = await Game.find({
      game_genres: { $all: regexArray },
    });
    res.json(filteredGames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/games/search/platform
// @review  Get games by a platform filter
// @access  Public
router.get("/search/platform/:search", async (req, res) => {
  try {
    const searchQuery = req.params.search;
    const platforms = searchQuery.split(" ");
    const regexArray = platforms.map((platform) => new RegExp(platform, "i"));
    const filteredGames = await Game.find({
      game_platforms: { $all: regexArray },
    });
    res.json(filteredGames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
