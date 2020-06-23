import React from 'react'
import './TrumpPanel.module.css'
import { Card } from '..'

export default class TrumpPanel extends React.Component {

    render(){
        const image = this.props.image ? this.props.image : false;
        return (
            <div className="trump-panel row card text-center">
                <h4>Trump Suit</h4>
                <Card image={image} />
            </div>
        )
    }

}
