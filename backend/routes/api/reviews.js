const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Review = require("../../models/Review");
const Game = require("../../models/Game");

// @route   GET api/reviews
// @desc    Get all reviews
// @access  Public
router.get("", async (req, res) => {
  try {
    const reviews = await Review.find().limit(parseInt(req.query.count));
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/reviews/game/:id
// @desc    Get a specific review on a video game
// @access  Public
router.get("/game/:id", async (req, res) => {
  try {
    const game = await Game.findOne({ rawg_id: req.params.id }).populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
        select: "name", // Assuming the user's name is stored in 'name' field
      },
    });
    if (!game) {
      return res.status(404).json({ msg: "Game not found" });
    }
    res.json(game.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/reviews/game/:id
// @desc    Post a review on a video game
// @access  Private
router.post("/game/:id", auth, async (req, res) => {
  try {
    let game = await Game.findOne({ rawg_id: req.params.id }).populate(
      "reviews"
    );
    if (!game) {
      return res.status(404).json({ msg: "Video game not found" });
    }
    const newReview = new Review({
      body: req.body.body,
      rating: req.body.rating,
      author: req.user.id,
    });
    await newReview.save();
    game.reviews.unshift(newReview._id);
    await game.save();
    await game.populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
        select: "name",
      },
    });
    res.json(game.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/reviews/game/:id/:review_id
// @desc    Delete a review on a video game
// @access  Private

router.delete("/game/:id/:review_id", auth, async (req, res) => {
  try {
    let game = await Game.findOne({ rawg_id: req.params.id });
    if (!game) {
      return res.status(404).json({ msg: "Video game not found" });
    }
    const review = await Review.findById(req.params.review_id);
    if (!review) {
      return res.status(404).json({ msg: "Review does not exist" });
    }
    const user = await User.findById(req.user.id);
    if (review.author.toString() !== req.user.id && user.role !== "admin") {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await review.deleteOne();
    game.reviews = game.reviews.filter(
      (reviewId) => reviewId.toString() !== req.params.review_id
    );
    await game.save();
    await game.populate({
      path: "reviews",
      populate: {
        path: "author",
        model: "User",
        select: "name",
      },
    });
    res.json(game.reviews);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
