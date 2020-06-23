import React from 'react'
import './MiddlePane.module.css'
import { Pane } from '..'

export default class MiddlePane extends React.Component {

    render(){
        return (
            <Pane paneClasses="col-xl-6 col-lg-5">
                {this.props.children}
            </Pane>
        );
    }

}
