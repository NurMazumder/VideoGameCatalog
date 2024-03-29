const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//our models
const User = require("../../models/User");
const VideoGame = require("../../models/VideoGame");
const Review = require("../../models/Review");

// @route   POST api/videogames
// @desc    Create a video game
// @access  Private/Admin
router.post(
  "/",
  [
    auth,
    [
      check("description", "Description is required").not().isEmpty(),
      check("name", "Name is required") // Change 'title' to 'name' to align with videoGameSchema
        .not()
        .isEmpty(),
      check("backgroundImage", "Background image is required") // Use 'backgroundImage' instead of 'image' and 'coverImage'
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      // Extract required fields from req.body
      const {
        description,
        name,
        backgroundImage,
        rawgId,
        released,
        website,
        rating,
        ratingsCount,
        platforms,
        developers,
        publishers,
        genres,
        tags,
      } = req.body;

      const videoGameFields = {};

      videoGameFields.user = req.user.id;
      videoGameFields.name = name;
      videoGameFields.description = description;
      videoGameFields.rawgId = rawgId;

      // Assign provided fields to videoGameFields, checking for existence
      if (backgroundImage) videoGameFields.backgroundImage = backgroundImage;
      if (released) videoGameFields.released = released;
      if (website) videoGameFields.website = website;
      if (rating) videoGameFields.rating = rating;
      if (ratingsCount) videoGameFields.ratingsCount = ratingsCount;
      if (platforms) videoGameFields.platforms = platforms;
      if (developers) videoGameFields.developers = developers;
      if (publishers) videoGameFields.publishers = publishers;
      if (genres) videoGameFields.genres = genres;
      if (tags) videoGameFields.tags = tags;

      const newVideoGame = new VideoGame(videoGameFields);

      const videoGame = await newVideoGame.save();
      res.json(videoGame);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/videogames
// @review    Get a list of all video games
// @access  Public

router.get("/", async (req, res) => {
  try {
    // Fetch all video games from the database, sort them by release date in descending order
    // and populate their reviews using the 'reviews' field
    const videoGames = await VideoGame.find()
      .sort({ released: -1 })
      .populate("reviews");
    res.json(videoGames);
  } catch (err) {
    console.error(err.message);
    // Respond with a server error if the operation fails
    res.status(500).send("Server error");
  }
});

// @route   GET api/videogames/:id
// @review    Get details of a specific video game by its id
// @access  Public

router.get("/:id", async (req, res) => {
  try {
    // Populate the 'reviews' to include details from the Review model associated with the video game
    const videoGame = await VideoGame.findById(req.params.id).populate(
      "reviews"
    );
    if (!videoGame) {
      return res.status(404).json({ msg: "Video game not found" });
    }
    // Return the video game details including the associated reviews
    res.json(videoGame);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      // This error check is for an invalid ObjectId to ensure the id provided is in the correct format
      return res.status(404).json({ msg: "Video game not found" });
    }
    // General server error response
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/videogames/:id
// @desc    Delete video game with id
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    /*
      // Check if the user has an admin role
      // does not work for now need to fix later
      if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'User not authorized' });
      }
*/
    const videoGame = await VideoGame.findById(req.params.id);

    if (!videoGame) {
      return res.status(404).json({ msg: "Video game not found" });
    }

    await VideoGame.findByIdAndDelete(req.params.id);

    res.json({ msg: "Video game removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Video game not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT api/videogames/:id
// @desc    Edit video game with id
// @access  Private

router.put(
  "/:id",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let videoGame = await VideoGame.findById(req.params.id);
      if (!videoGame) {
        return res.status(404).json({ msg: "Video game not found" });
      }
      /*
        // Assuming the video game model has a reference to the user for authorization
        // Check if the game belongs to the user attempting to edit it
        if (videoGame.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }
  */
      const {
        name,
        description,
        released,
        backgroundImage,
        website,
        rating,
        ratingsCount,
        platforms,
        developers,
        publishers,
        genres,
        tags,
        rawgId,
        // Include other fields as necessary
      } = req.body;

      const videoGameFields = {};

      if (name) videoGameFields.name = name;
      if (description) videoGameFields.description = description;
      if (released) videoGameFields.released = released;
      if (backgroundImage) videoGameFields.backgroundImage = backgroundImage;
      if (website) videoGameFields.website = website;
      if (rating) videoGameFields.rating = rating;
      if (ratingsCount) videoGameFields.ratingsCount = ratingsCount;
      if (platforms) videoGameFields.platforms = platforms;
      if (developers) videoGameFields.developers = developers;
      if (publishers) videoGameFields.publishers = publishers;
      if (genres) videoGameFields.genres = genres;
      if (tags) videoGameFields.tags = tags;
      if (rawgId) videoGameFields.rawgId = rawgId;
      // Apply updates for other fields as necessary

      videoGame = await VideoGame.findOneAndUpdate(
        { _id: req.params.id },
        { $set: videoGameFields },
        { new: true }
      );

      return res.json(videoGame);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//// ---------review------------------------- /////

// @route   POST api/videogames/review/:id
// @desc    Review on a video game
// @access  Private

router.post(
  "/review/:id",
  [
    auth,
    [
      check("body", "Review body is required").not().isEmpty(),
      check("rating", "Rating is required and should be a number").isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const videoGame = await VideoGame.findById(req.params.id).populate(
        "reviews"
      );

      if (!videoGame) {
        return res.status(404).json({ msg: "Video game not found" });
      }

      const newReview = new Review({
        body: req.body.body,
        rating: req.body.rating,
        author: req.user.id, // Assuming 'author' is the field linking a review to a user
      });

      const review = await newReview.save();
      videoGame.reviews.unshift(review._id); // Adding the review ID to the video game's reviews array

      await videoGame.save();

      res.json(videoGame.reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/videogames/review/:id/:review_id
// @desc    Delete a review on a video game
// @access  Private
router.delete("/review/:id/:review_id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.review_id);

    if (!review) {
      return res.status(404).json({ msg: "Review does not exist" });
    }

    const user = await User.findById(req.user.id);

    // Checking if the user is the author of the review or the site owner/admin
    if (review.author.toString() !== req.user.id && user.role !== "admin") {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await review.remove();

    // Assuming you need to update the video game model after review deletion,
    // you would fetch the video game here and remove the review from its reviews array.
    const videoGame = await VideoGame.findById(req.params.id);
    if (videoGame) {
      videoGame.reviews = videoGame.reviews.filter(
        (reviewId) => reviewId.toString() !== req.params.review_id
      );
      await videoGame.save();
    }

    res.json({ msg: "Review removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
