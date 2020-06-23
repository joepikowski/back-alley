import React from 'react'
import './Hand.module.css'
import { HandCard } from '..'

export default class Hand extends React.Component {

    render(){
        const handClasses = `hand row card ${this.props.yourTurnToPlay ? 'hand-prompt-action' : ''}`;
        const cards = this.props.cards.map((card) => {
            const onClick = this.props.handlePlayCard.bind(this.props.handlePlayCard, card.code);
            return (
                <HandCard key={card.code} image={card.image} onClick={onClick} />
            );
        });
        return (
            <div className="hand-container pt-4">
                <h4>Your Hand</h4>
                <div className={handClasses} >
                    <div className="container">
                        <div className="row no-gutters">
                            {cards}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
