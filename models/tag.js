const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tag_id: {
        type: Number,
        unique: true
    },
    tag_name: {
        type: String,
        unique: true
    },
    rawg_id: {
        type: Number, //not sure what to specify as 
        unique: true
    }
})

const myGamesModel = mongoose.model('tagTest', tagSchema);

module.exports = myTagModel;