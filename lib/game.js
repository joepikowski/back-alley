const _ = require('lodash');

class Game {

    constructor(deck){
        this.deck = deck;
        this.gameState = {};
        this.storedStates = [];
        this.maxStoredStates = 10;
        this.startingState = {
            gamePhase: 'joining',
            gameStarted: false,
            playerCount: 0,
            players: {},
            highestBid: -1,
            trump: {},
            table: [],
            playLog: [],
            scoreCard: [],
            round: 0,
            totalBids: 0,
            maxRounds: -1,
            backHalf: false,
            currentDealer: -1,
            currentBidder: 0,
            currentPlayer: -1,
        };
        this.reset();
    }

    log(msg){
        this.gameState.playLog.push(msg);
    }

    reset(){
        this.gameState = _.cloneDeep(this.startingState);
        this.storedStates = [];
    }

    async recordState(){
        try{
            this.storedStates.push(
                _.cloneDeep(this.gameState)
            );
            if (this.storedStates.length > this.maxStoredStates){
                this.storedStates.splice(0,1);
            }
        }catch(err){
            throw new Error(err);
        }
    }

    restoreState(stepsBack){
        if (this.storedStates.length > 0 && stepsBack <= this.storedStates.length){
            const restoreStates = this.storedStates.splice( -stepsBack );
            this.gameState = _.cloneDeep( restoreStates[0] );
            this.log(`[UNDO MOVE] Oops!`);
        }else{
            this.log('Cannot rewind!');
        }
    }

    getGameStateForPlayer(player){
        const players = Object.keys(this.gameState.players);
        const playerIsSeated = players.indexOf(player) > -1;
        const others = playerIsSeated ? (players.slice(players.indexOf(player) + 1)).concat( players.slice(0, players.indexOf(player))) : players;
        const positioned = others.map((player) => {
            return {
                score: this.gameState.players[player].score,
                name: player,
                cardCount: this.gameState.players[player].hand.length,
                currentTricks: this.gameState.players[player].currentTricks,
                currentBid: this.gameState.players[player].currentBid,
                isCurrentDealer: (players.indexOf(player) === this.gameState.currentDealer),
                isCurrentBidder: (players.indexOf(player) === this.gameState.currentBidder),
                isCurrentPlayer: (players.indexOf(player) === this.gameState.currentPlayer),
                color: this.gameState.players[player].color
            };
        });
        return {
            gameStarted: this.gameState.gameStarted,
            youAreSeated: playerIsSeated,
            round: this.gameState.round,
            trumpImage: this.gameState.trump.image,
            gamePhase: this.gameState.gamePhase,
            yourTurnToBid: this.gameState.gamePhase === 'bidding' && players.indexOf(player) === this.gameState.currentBidder,
            yourTurnToPlay: this.gameState.gamePhase === 'playing' && players.indexOf(player) === this.gameState.currentPlayer,
            yourName: player,
            yourHand: this.gameState.players[player] ? this.gameState.players[player].hand : [],
            yourTricks: this.gameState.players[player] ? this.gameState.players[player].currentTricks : 0,
            yourBid: this.gameState.players[player] ? this.gameState.players[player].currentBid : 0,
            totalBids: this.gameState.totalBids,
            playersByPosition: positioned,
            playerNames: players,
            table: this.gameState.table,
            log: this.gameState.playLog,
            currentDealer: players[this.gameState.currentDealer],
            scoreCard: this.gameState.scoreCard
        };
    }

    addPlayers(players = []){
        if (!this.gameState.gameStarted){
            if (this.gameState.playerCount < 5){
                for (const player of players){
                    this.gameState.players[player] = {
                        'score': 0,
                        'currentTricks': 0,
                        'currentBid': 0,
                        'hand': [],
                        'color': this.getRandomColor()
                    };
                    this.log(`${player} joined the game.`);
                }
                this.gameState.playerCount += players.length;
            }else{
                this.log('Too many players to join!');
            }
        }
    }

    removePlayer(player){
        if (!this.gameState.gameStarted){
            delete this.gameState.players[player];
            this.gameState.playerCount--;
            this.log(`${player} left the game.`);
        }
    }

    getRandomColor(){
        let color = 'f';
        while (color[0] === 'f' || color[0] === 'e'){
            color = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
        }
        return `#${color}`;
    }

    addChatMessage(player, msg){
        this.log(`[${player}]: ${msg}`);
    }

    async startGame(){
        if (this.gameState.playerCount >= 3){
            this.gameState.maxRounds = Math.floor( 52 / this.gameState.playerCount );
            this.log('Starting game.');
            this.gameState.gameStarted = true;
            this.gameState.gamePhase = 'bidding';
            await this.randomlyChooseDealer();
            await this.resetForNextRound();
            this.beginNextRound();
        }else{
            this.log('Not enough players to start!');
        }
    }

    async randomlyChooseDealer(){
        const d = Math.floor(Math.random() * Math.floor(this.gameState.playerCount));
        this.log(`Randomly choosing first dealer.`);
        this.gameState.currentDealer = d;
        this.gameState.currentBidder = d + 1;
    }

    async resetForNextRound(){
        const players = Object.keys(this.gameState.players);
        for (const player of players){
            this.gameState.players[player] = {...this.gameState.players[player], currentTricks: 0, currentBid: 0, hand: [] };
        }
        this.gameState.trump = {};
        this.gameState.table = [];
        this.gameState.totalBids = 0;
        this.gameState.currentDealer = ++this.gameState.currentDealer % players.length;
        this.gameState.currentBidder = (this.gameState.currentDealer + 1 ) % players.length;
        this.gameState.gamePhase = 'bidding';
    }

    resetForNextHand(winner){
        this.gameState.gamePhase = 'playing';
        this.gameState.table = [];
    }

    async beginNextRound(){
        const players = Object.keys(this.gameState.players);
        if (this.gameState.backHalf){
            this.gameState.round--;
        }else if (this.gameState.round === this.gameState.maxRounds){
            this.gameState.backHalf = true;
        }else{
            this.gameState.round++;
        }
        if (this.gameState.round === 0){
            this.gameState.round = '';
            this.log('Game complete.');
            const winning = await this.calculateWinner();
            this.log(`The winner is ${winning.player} with ${winning.score} points!`);
            this.gameState.gameStarted = false;
            return;
        }
        this.log(`[Round ${this.gameState.round}]`);
        this.log(`${players[this.gameState.currentDealer]} deals.`);
        let draw;
        if (this.gameState.round >= 13){
            await this.deck.shuffle();
            draw = await this.deck.draw(1);
            await this.pullTrump(draw);
            await this.deck.shuffle();
            draw = await this.deck.draw( (this.gameState.round * this.gameState.playerCount) );
        }else{
            await this.deck.shuffle();
            draw = await this.deck.draw( (this.gameState.round * this.gameState.playerCount) + 1 );
            draw = await this.pullTrump(draw);
        }
        await this.dealCards(draw);
        this.sortHands();
        this.log(`Trump is ${this.gameState.trump.suit}.`);
        this.log(`${players[this.gameState.currentBidder]} to bid.`);
        return;
    }

    async calculateWinner(){
        const players = Object.keys(this.gameState.players);
        players.sort((a, b) => {
            return this.gameState.players[b].score - this.gameState.players[a].score;
        });
        return {
            player: players[0],
            score: this.gameState.players[players[0]].score
        }
    }

    async pullTrump(draw){
        this.gameState.trump = draw.cards.pop();
        return draw;
    }

    async dealCards(draw){
        const players = Object.keys(this.gameState.players);
        let seatToDeal = ( this.gameState.currentDealer + 1 ) % players.length;
        for (const card of draw.cards){
            const playerToDeal = players[seatToDeal];
            this.gameState.players[playerToDeal].hand.push({...card, value: this.convertCardValue(card)});
            seatToDeal = ++seatToDeal % players.length;
        }
        return;
    }

    sortHands(){
        const players = Object.keys(this.gameState.players);
        const order = ['D','S','H','C'];
        for (const player of players){
            this.gameState.players[player].hand.sort((a, b) => {
                return ( ( b.value + (order.indexOf(b.suit.slice(0,1)) * 1000)) - (a.value + (order.indexOf(a.suit.slice(0,1)) * 1000)) );
            });
        }
    }

    convertCardValue(card){
        const faceCards = ['JACK','QUEEN','KING','ACE'];
        const i = faceCards.indexOf(card.value);
        if (i > -1){
            return 11 + i;
        }else{
            return parseInt(card.value);
        }
    }

    async recordBid(player, bid){
        await this.recordState();
        bid = parseInt(bid);
        if (this.gameState.gamePhase === 'bidding'){
            const players = Object.keys(this.gameState.players);
            if (Object.keys(this.gameState.players).indexOf(player) === this.gameState.currentBidder){
                if (bid >= 0 && bid <= this.gameState.round){

                    this.gameState.players[player].currentBid = bid;
                    this.log(`${player} bids ${bid}.${bid === this.gameState.round ? ' Good luck!' : ''}`);
                    this.gameState.totalBids += bid;

                    if (bid > this.gameState.highestBid){
                        this.gameState.currentPlayer = players.indexOf(player);
                        this.gameState.highestBid = bid;
                    }

                    if (this.gameState.currentBidder === this.gameState.currentDealer){
                        this.gameState.currentBidder = ++this.gameState.currentBidder % players.length;
                        this.log('All bids recorded. Play begins.');
                        this.log(`${this.gameState.totalBids} of ${this.gameState.round} bid.`);
                        this.log(`${players[this.gameState.currentPlayer]} with a bid of ${this.gameState.highestBid} plays first.`);
                        this.gameState.gamePhase = 'playing';
                        this.gameState.highestBid = -1;
                    }else{
                        this.gameState.currentBidder = ++this.gameState.currentBidder % players.length;
                        this.log(`${players[this.gameState.currentBidder]} to Bid.`);
                    }


                }else{
                    this.log(`Not a valid bid amount.`);
                }
            }else{
                this.log(`Not ${player}'s turn to bid.`);
            }
        }else{
            this.log('Not currently accepting bids.');
            this.log(`${players[this.gameState.currentPlayer]} to play.`);
        }

    }

    async playCard(player, card){
        await this.recordState();
        const players = Object.keys(this.gameState.players);
        if (this.gameState.gamePhase === 'playing'){

            if (players.indexOf(player) === this.gameState.currentPlayer){
                const playedCard = this.removeCardFromHand(player, card);

                if (playedCard != false){
                    this.log(`${player} plays ${card}.`);
                    this.gameState.table.push({...playedCard, player: player});
                    if (this.gameState.table.length === this.gameState.playerCount){
                        const winning = await this.determineCurrentHighCard(this.gameState.table, this.gameState.trump.suit);
                        this.gameState.players[winning.player].currentTricks++;

                        if (this.gameState.players[player].hand.length === 0){
                            this.gameState.gamePhase = 'scoring';
                            setTimeout(async () => {
                                this.log('Round is done.');
                                await this.calculateAllScores();
                                await this.resetForNextRound();
                                this.beginNextRound();
                            }, 5000);
                        }else{
                            this.gameState.gamePhase = 'scoring';
                            setTimeout(() => {
                                this.resetForNextHand(winning.player);
                                this.gameState.currentPlayer = players.indexOf(winning.player);
                                this.log(`${winning.player} to play.`);
                            }, 5000);
                        }

                    }else{
                        this.gameState.currentPlayer = ++this.gameState.currentPlayer % players.length;
                        this.log(`${players[this.gameState.currentPlayer]}'s turn.`);
                    }
                }else{
                    console.log(`I think ${player} is hacking...`);
                }
            }else{
                this.log(`Not ${player}'s turn.`);
            }

        }else{
            this.log(`Round has not started.`);
            this.log(`${players[this.gameState.currentBidder]} to bid.`);
        }
    }

    removeCardFromHand(player, card){
        let playedCard;
        for (const [i, c] of this.gameState.players[player].hand.entries()){
            if (c.code === card){
                playedCard = this.gameState.players[player].hand.splice(i,1)[0];
                return playedCard;
            }
        }
        return false;
    }

    async determineCurrentHighCard(table, trump){
        let trumpUsed = false;
        let highCard = false;
        let winningPlayer;
        for (const card of table){
            if (trumpUsed){
                if (card.suit === trump && card.value > highCard.value){
                    highCard = card;
                    winningPlayer = card.player;
                }
            }else if (!trumpUsed && card.suit === trump){
                highCard = card;
                winningPlayer = card.player;
                trumpUsed = true;
            }else if (!highCard){
                highCard = card;
                winningPlayer = card.player;
            }else if (card.suit === highCard.suit && card.value > highCard.value){
                highCard = card;
                winningPlayer = card.player;
            }
        }
        this.log(`${winningPlayer} wins with ${highCard.code}.`);
        return {
            player: winningPlayer,
            card: highCard
        };
    }

    async calculateAllScores(){
        const scoreCardLine = [this.gameState.round];
        for (const player of Object.keys(this.gameState.players)){
            const score = await this.calculateScore(player, this.gameState.round);
            scoreCardLine.push(score);
        }
        this.gameState.scoreCard.push(scoreCardLine);
        return;
    }

    async calculateScore(player, round){
        let multiplier = 3;
        if (round === 1){
            multiplier = 10;
        }else if (this.gameState.players[player].currentBid === round){
            multiplier *= 2
        }
        if (this.gameState.players[player].currentTricks < this.gameState.players[player].currentBid){
            this.log(`${player} bid ${this.gameState.players[player].currentBid} and won ${this.gameState.players[player].currentTricks}. (-${this.gameState.players[player].currentBid * multiplier})`);
            this.gameState.players[player].score -= (this.gameState.players[player].currentBid * multiplier);
        }else{
            this.log(`${player} bid ${this.gameState.players[player].currentBid} and won ${this.gameState.players[player].currentTricks}. (+${(this.gameState.players[player].currentBid * multiplier) + (this.gameState.players[player].currentTricks - this.gameState.players[player].currentBid)})`);
            this.gameState.players[player].score += (this.gameState.players[player].currentBid * multiplier) + (this.gameState.players[player].currentTricks - this.gameState.players[player].currentBid);
        }

        return this.gameState.players[player].score;
    }

}

module.exports = Game;
