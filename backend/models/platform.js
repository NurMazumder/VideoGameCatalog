const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const platformSchema = new Schema({
    platform_id: {
        type: Number,
        unique: true
    },
    platform_name: {
        type: String,
        unique: true
    },
    rawg_id: {
        type: Number, //not sure what to specify as 
        unique: true
    }
})

const myGamesModel = mongoose.model('platformTest', platformSchema);

module.exports = myPlatformModel;