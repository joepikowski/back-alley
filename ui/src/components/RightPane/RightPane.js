import React from 'react'
import './RightPane.module.css'
import { Pane } from '..'

export default class RightPane extends React.Component {

    render(){
        return (
            <Pane paneClasses="col-xl-3 col-lg-3">
                {this.props.children}
            </Pane>
        );
    }

}
