// models/player.js

//Importing Mongoose
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: String,
    isActive: Boolean,
});

//  Creating the model

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;