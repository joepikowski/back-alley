const router = require('express').Router();
const bodyParser = require('body-parser')

module.exports = (game) => {

    router.get('/addPlayer/:id', (req, res) => {
        game.addPlayers([req.params.id]);
        res.send('ok');
    });

    router.get('/removePlayer/:id', (req, res) => {
        game.removePlayer(req.params.id);
        res.send('ok');
    });

    router.get('/startGame', (req, res) => {
        game.startGame();
        res.send('ok');
    });

    router.get('/bid/:player/:bid', (req, res) => {
        game.recordBid(req.params.player, req.params.bid);
        res.send('ok');
    });

    router.get('/playCard/:player/:card', (req, res) => {
        game.playCard(req.params.player, req.params.card);
        res.send('ok');
    });

    router.post('/chatMessage/:player', bodyParser.json(), (req, res) => {
        game.addChatMessage(req.params.player, req.body.msg);
        res.send('ok');
    });

    router.get('/reset', (req, res) => {
        game.reset();
        res.send('ok');
    });

    router.get('/undo/:steps', (req, res) => {
        game.restoreState(req.params.steps);
        res.send('ok');
    });

    return router;
}
