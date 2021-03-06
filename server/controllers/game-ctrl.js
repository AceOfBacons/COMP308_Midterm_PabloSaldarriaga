const Game = require('../models/game-model')

createGame = (req, res) => {
    const body = req.body
    console.log(body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a game',
        })
    }

    const game = new Game(body)

    if (!game) {
        return res.status(400).json({ success: false, error: err })
    }

    game
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: game._id,
                message: 'Game created!',
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({
                error,
                message: 'Game not created!',
            })
        })
}

updateGame = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Game.findOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Game not found!',
            })
        }
        game.gameGenre = body.gameGenre
        game.daysPerYear = body.daysPerYear
        game.age = body.age
        game
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: game._id,
                    message: 'Game updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Game not updated!',
                })
            })
    })
}

deleteGame = async (req, res) => {
    await Game.findOneAndDelete({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!game) {
            return res
                .status(404)
                .json({ success: false, error: `Game not found` })
        }

        return res.status(200).json({ success: true, data: game })
    }).catch(err => console.log(err))
}

getGameById = async (req, res) => {
    await Game.findOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: game })
    }).catch(err => console.log(err))
}

getGames = async (req, res) => {
    await Game.find({}, (err, games) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!games.length) {
            return res
                .status(404)
                .json({ success: false, error: `Game not found` })
        }
        return res.status(200).json({ success: true, data: games })
    }).catch(err => console.log(err))
}

module.exports = {
    createGame,
    updateGame,
    deleteGame,
    getGames,
    getGameById,
}
