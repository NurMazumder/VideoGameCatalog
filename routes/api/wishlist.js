const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route POST api/wishlist
// @desc Add wishlist game
// @access Public
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId } = req.body;
    const user = await User.findById(userId);
    if (user.wishlist.includes(gameId)) {
      return res.status(400).json({ msg: "Game already in wishlist" });
    }
    user.wishlist.push(gameId);
    await user.save();
    res.json({ msg: "Game added to wishlist successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route Get api/wishlist
// @desc Get wishlist games
// @access Public
router.get("/retrieve", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const wishlist = user.wishlist;
    res.json(wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/wishlist
// @desc Delete wishlist game
// @access Public
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const gameId = req.params.id;
    const user = await User.findById(userId);
    if (!user.wishlist.includes(gameId)) {
      return res.status(400).json({ msg: "Game not in wishlist" });
    }
    user.wishlist = user.wishlist.filter((game) => game !== gameId);
    await user.save();
    res.json({ msg: "Review removed" });
  } catch (error) {
    console.log(error);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
