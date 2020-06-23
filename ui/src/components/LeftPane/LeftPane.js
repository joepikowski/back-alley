import React from 'react'
import './LeftPane.module.css'
import { Pane } from '..'

export default class LeftPane extends React.Component {

    render(){
        return (
            <Pane paneClasses="left-pane col-3">
                {this.props.children}
            </Pane>
        );
    }

}
