import React from 'react'
import './Card.module.css'
import CardBack from './card-back.png'

export default class Card extends React.Component {

    render(){
        const cardClasses = `playing-card
                             ${this.props.className}`;

        const src = this.props.image ? this.props.image : CardBack;

        return (
            <div className={cardClasses} onClick={this.props.onClick ? this.props.onClick : null}>
                <img className="playing-card-image" src={src} />
                {this.props.children}
            </div>
        );
    }

}
