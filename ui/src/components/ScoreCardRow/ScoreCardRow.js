import React from 'react'
import './ScoreCardRow.module.css'

export default class ScoreCardRow extends React.Component {

    render(){
        const scoreLine = this.props.scores.map((score, i) => {
            return ( <td key={i}>{score}</td> );
        });
        return (
            <tr>
                <th scope="row">{this.props.round}</th>
                {scoreLine}
            </tr>
        );
    }

}
