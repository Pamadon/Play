var mongoose = require('mongoose');

var activeGamesschema = new mongoose.Schema({
    gameName: String,
    lat: Number,
    long: Number,
    start: Number,
    end: Number,
    cap: Number,
    ownerId: Number
});


var ActiveGames = mongoose.model('ActiveGames', activeGamesschema);

module.exports = ActiveGames;
