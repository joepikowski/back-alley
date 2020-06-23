import React from 'react';
import './TableCard.module.css'
import { Card } from '..'

export default class TableCard extends React.Component {

    render(){
        return (
            <>
                <Card image={this.props.image} className="col pt-3 text-center">
                    <h6>{this.props.owner}</h6>
                </Card>
            </>
        )
    }

}
