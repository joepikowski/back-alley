import React from 'react'
import './Table.module.css'
import { TableCard } from '..'

export default class Table extends React.Component {

    render(){
        const cards = this.props.cards.map((card) => {
            return (
                <TableCard key={card.code} image={card.image} owner={card.player}/>
            );
        });
        return (
            <div className="play-table-container pt-4">
                <h4>Table</h4>
                <div className="play-table row card">
                    <div className="container">
                        <div className="row">
                            {cards}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
