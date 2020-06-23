const Game = require('./lib/game.js');
const Deck = require('./lib/deck.js');

const express = require('express');
const Session = require('express-session');
const app = express();
const passport = require('passport');
const passportSocketIO = require('passport.socketio');
const cookieParser = require('cookie-parser');
const config = require('./config');

(async () => {

    try {
        const deck = new Deck();

        await deck.new();

        const game = new Game(deck);

        const FileStore = require('session-file-store')(Session);

        const sessionConfig = {
            secret: config.session.secret,
            store: new FileStore(),
            resave: false,
            saveUninitialized: true
        };

        session = Session(sessionConfig);

        app.use(session);

        //Initialize Passport Middleware
        require('./auth')(app, passport, session);

        //Plug in Routes to App
        require('./routes')(app, game, passport);

        //Generic Error Handler
        app.use((err, req, res, next) => { console.log(`Error: ${err}`); });

        //Start Listening
        const server = app.listen(config.app.port, () => console.log(`App Listening on Port ${config.app.port}!`));

        const io = require('socket.io')(server);

        io.use(passportSocketIO.authorize({
            key: 'connect.sid',
            secret: config.session.secret,
            store: sessionConfig.store,
            passport: passport,
            cookieParser: cookieParser
        }));

        io.sockets.on('connection', socket => {

            const updates = setInterval(() => {
                socket.emit('gameUpdate', game.getGameStateForPlayer(socket.request.user.name));
            }, 200);

            socket.on('disconnect', () => {
                clearInterval(updates);
            });
        });

    }catch(err){
        throw new Error(err);
    }

})();
