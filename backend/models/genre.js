const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genre_id: {
        type: Number,
        unique: true
    },
    genre_name: {
        type: String,
        unique: true
    },
    rawg_id: {
        type: Number, //not sure what to specify as 
        unique: true
    }
})

const myGamesModel = mongoose.model('genreTest', genreSchema);

module.exports = myGenreModel;