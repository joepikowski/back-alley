import React from 'react'
import './Pane.module.css'

export default class Pane extends React.Component {

    render(){
        return (
            <div className={`pane ${this.props.paneClasses}`} >
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }

}
