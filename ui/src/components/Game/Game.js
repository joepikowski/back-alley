import React from 'react'
import './Game.module.css'
import { LeftPane, MiddlePane, RightPane, TrumpPanel, ScoreCard, GameControls, PlayerPane, Table, Header, Hand, Tricks, GameLog, BidPanel } from '..'

export default class Game extends React.Component {

    render(){
        return (
            <div className="game row">
                <LeftPane>
                    <TrumpPanel image={this.props.game.trumpImage} />
                    <ScoreCard playerNames={this.props.game.playerNames} scoreCard={this.props.game.scoreCard} />
                    <GameControls   gameStarted={this.props.game.gameStarted}
                                    youAreSeated={this.props.game.youAreSeated}
                                    resetUnlocked={this.props.resetUnlocked}
                                    undoUnlocked={this.props.undoUnlocked}
                                    controls={this.props.controls} />
                </LeftPane>
                <MiddlePane>
                    <PlayerPane     players={this.props.game.playersByPosition}
                                    gamePhase={this.props.game.gamePhase}
                                    dealer={this.props.game.currentDealer} />
                    <Table cards={this.props.game.table} />
                    <Header round={this.props.game.round}
                            dealer={this.props.game.currentDealer}
                            yourName={this.props.game.yourName}
                            bid={this.props.game.yourBid}
                            tricks={this.props.game.yourTricks}
                            totalBids={this.props.game.totalBids} />
                    <Hand cards={this.props.game.yourHand} yourTurnToPlay={this.props.game.yourTurnToPlay} handlePlayCard={this.props.controls.handlePlayCard} />
                    <Tricks count={this.props.game.yourTricks}/>
                </MiddlePane>
                <RightPane>
                    <GameLog log={this.props.game.log} onSubmit={this.props.controls.handleChatSubmit}/>
                    <BidPanel yourTurnToBid={this.props.game.yourTurnToBid} onSubmit={this.props.controls.handleBidSubmit}/>
                </RightPane>
            </div>
        );
    }

}
