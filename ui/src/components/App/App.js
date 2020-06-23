import React from 'react'
import './App.module.css'
import socketIOClient from 'socket.io-client'
import { NavBar, Game, Loading } from '..'
import Favicon from './favicon.ico'
import BackAlleyAPI from '../../js/backalley-api-client.js'

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            resetUnlocked: false,
            undoUnlocked: false
        };
    }

    setResetUnlock(unlock = true){
        this.setState((state) => { return { resetUnlocked: unlock }; });
        if (unlock) { setTimeout(this.setResetUnlock.bind(this, false), 6000); }
    }

    setUndoUnlock(unlock = true){
        this.setState((state) => { return { undoUnlocked: unlock }; });
        if (unlock) { setTimeout(this.setUndoUnlock.bind(this, false), 6000); }
    }

    addPlayer(player){
        BackAlleyAPI.addPlayer(player);
    }

    removePlayer(player){
        BackAlleyAPI.removePlayer(player);
    }

    startGame(){
        BackAlleyAPI.startGame();
    }

    logOut(){
        window.location = './logout';
    }

    handleBidSubmit(player, bid){
        BackAlleyAPI.recordBid(player, bid);
    }

    handlePlayCard(player, card){
        BackAlleyAPI.playCard(player, card);
    }

    handleChatSubmit(player, message){
        BackAlleyAPI.sendChatMsg(player, message);
    }

    handleResetClick(){
        BackAlleyAPI.reset();
        this.setResetUnlock(false);
    }

    handleUndoClick(){
        BackAlleyAPI.undo(1);
        this.setUndoUnlock(false);
    }

    getControls(){
        return {
            addPlayer: this.addPlayer.bind(this, this.state.game.yourName),
            removePlayer: this.removePlayer.bind(this, this.state.game.yourName),
            startGame: this.startGame.bind(this),
            logOut: this.logOut,
            handleBidSubmit: this.handleBidSubmit.bind(this, this.state.game.yourName),
            handlePlayCard: this.handlePlayCard.bind(this, this.state.game.yourName),
            handleChatSubmit: this.handleChatSubmit.bind(this, this.state.game.yourName),
            setResetUnlock: this.setResetUnlock.bind(this, true),
            setUndoUnlock: this.setUndoUnlock.bind(this, true),
            handleResetClick: this.handleResetClick.bind(this),
            handleUndoClick: this.handleUndoClick.bind(this)
        };
    }

    componentDidMount(){
        const socket = socketIOClient();
        socket.on('gameUpdate', (data) => { this.setState({ game: data })});
    }

    render(){
        if (this.state.game){
            return (
                <div className="container-fluid text-center">
                    <NavBar />
                    <Game   game={this.state.game}
                            controls={this.getControls()}
                            resetUnlocked={this.state.resetUnlocked}
                            undoUnlocked={this.state.undoUnlocked} />
                </div>
            );
        }else{
            return ( <Loading /> );
        }

    }
}
