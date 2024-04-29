const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoGameSchema = new Schema({
  rawgId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  developers: [
    {
      name: String,
    },
  ],
  publishers: [
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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("VideoGame", videoGameSchema);
