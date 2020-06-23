import React from 'react'
import './PlayerPane.module.css'
import { Player } from '..'

export default class PlayerPane extends React.Component {

    render(){
        const players = this.props.players.map((player) => {
            const isTurn = ((this.props.gamePhase === 'bidding' && player.isCurrentBidder) || (this.props.gamePhase === 'playing' && player.isCurrentPlayer));
            return ( <Player    key={player.name}
                                isTurn={isTurn}
                                isDealer={player.name === this.props.dealer}
                                color={player.color}
                                name={player.name}
                                currentTricks={player.currentTricks}
                                currentBid={player.currentBid}
                                cardCount={player.cardCount} /> );
        });

        return (
            <div className="player-pane">
                <h4>Other Seats</h4>
                <div className="row card">
                    <div className="container">
                        <div className="row">
                            {players}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
