const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: [true, "Player Name is required."],
        }
    },
    { timestamps: true });

const Player = mongoose.model("Player", PlayerSchema);
module.exports = Player;
