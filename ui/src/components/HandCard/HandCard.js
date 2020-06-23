import React from 'react'
import './HandCard.module.css'
import { Card } from '..'

export default class HandCard extends React.Component {

    render(){
        return (
            <Card image={this.props.image} className="col-2 pt-4 pl-1 pr-1" onClick={this.props.onClick} />
        );
    }

}
