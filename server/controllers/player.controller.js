const Player = require("../models/player.model");

// TODO, CREATE READ, UPDATE, DELETE

module.exports.findAllPlayers = (req, res) => {
  Player.find()
    .then((allPlayers) => res.json(allPlayers))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};
