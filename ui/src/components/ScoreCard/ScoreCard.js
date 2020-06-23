import React from 'react'
import './ScoreCard.module.css'
import { ScoreCardRow } from '..'

export default class ScoreCard extends React.Component {

    render(){
        const scoreCardHeader = this.props.playerNames.map((name) => {
            return (
                <th key={name} scope="col">{name.substring(0,3).toUpperCase()}</th>
            );
        });
        const scoreCardRows = this.props.scoreCard.map((row) => {
            const round = row.shift();
            return (
                <ScoreCardRow key={`round-${round}`} round={round} scores={row} />
            );
        });
        return (
            <div className="score-card row card">
                <h4>Score Card</h4>
                <div className="container-fluid table-responsive">
                    <table className="table table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Round</th>
                                {scoreCardHeader}
                            </tr>
                        </thead>
                        <tbody className="table-striped">
                            {scoreCardRows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
