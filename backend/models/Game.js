const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  rawg_id: {
    type: Number,
    unique: true,
  },
  game_name: {
    type: String,
    required: true,
  },
  game_description: {
    type: String,
  },
  game_background_image: {
    type: String,
  },
  game_genres: {
    genreId: {
      type: Number,
      unique: true,
    },
    genreName: String,
  },
  game_released: {
    type: Date,
  },
  game_tags: {
    tagId: {
      type: Number,
      unique: true,
    },
    tagName: String,
  },
  game_rating: {
    type: Number,
  },
  game_ratings_count: {
    type: Number,
  },
  game_platforms: {
    platformId: {
      type: Number,
      unique: true,
    },
    platformName: String,
  },
  game_esrb: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Game", GameSchema, "gamestests");
