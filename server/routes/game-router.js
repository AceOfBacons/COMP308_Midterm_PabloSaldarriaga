const express = require('express')

const GameCtrl = require('../controllers/game-ctrl')

const router = express.Router()

router.post('/game', GameCtrl.createGame)
router.put('/game/:id', GameCtrl.updateGame)
router.delete('/game/:id', GameCtrl.deleteGame)
router.get('/game/:id', GameCtrl.getGameById)
router.get('/game', GameCtrl.getGames)

module.exports = router
