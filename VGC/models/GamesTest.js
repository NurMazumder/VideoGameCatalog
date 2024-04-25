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
  released: Date,
  backgroundImage: {
    type: String,
    required: true,
  },
  website: String,
  rating: Number,
  ratingsCount: Number,
  platforms: [
    {
      name: String,
    },
  ],
  genres: [
    {
      name: String,
    },
  ],
  tags: [
    {
      name: String,
    },
  ],
  esrb: {
    type: String,
  },
});

module.exports = mongoose.model("gamestests", GameSchema, "gamestests");