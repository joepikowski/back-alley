import React from 'react'
import './Player.module.css'
import { DealerIcon } from '..'

export default class Player extends React.Component {

    render(){
        const playerStyle = { backgroundColor: this.props.color };
        const playerImageClasses = `player-image ${this.props.isTurn ? 'player-image-indicate-turn' : ''} pt-2 text-white text-wrap`;

        return (
            <div className="player col text-center pt-2">
                <span className={playerImageClasses} style={playerStyle}>
                    <h6 className="player-name pt-3">{this.props.name}</h6>
                    {this.props.isDealer && <DealerIcon display="block" />}
                </span>
                <h6 className="player-bid pt-2">Current Bid: {this.props.currentTricks} / {this.props.currentBid}</h6>
                <h6 className="player-cards">Cards in Hand: {this.props.cardCount}</h6>
            </div>
        );
    }

}
