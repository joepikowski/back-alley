import React from 'react'
import './Tricks.module.css'
import { Trick } from '..'

export default class Tricks extends React.Component {

    render(){
        const tricks = [];
        for (let i = 0; i < this.props.count; i++){
            tricks.push( <Trick /> );
        }
        return (
            <div className="trick-container pt-4">
                <h4>Won</h4>
                <div className="tricks row card" >
                    <div className="container">
                        <div className="row no-gutters">
                            {tricks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
