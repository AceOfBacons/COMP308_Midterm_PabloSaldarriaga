const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Game = new Schema(
    {
        gameGenre: { type: String, required: true },
        daysPerYear: { type: Number, required: true },
        age: { type: Number, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('games', Game)
