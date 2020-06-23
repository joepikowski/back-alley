import React from 'react'
import './ControlButton.module.css'

export default class ControlButton extends React.Component {

    render(){
        const style = this.props.style ? this.props.style : 'primary';
        const buttonClasses = `control-button btn-${style} btn pt-2`;
        const onClick = this.props.clickHandler ? this.props.clickHandler : null;

        return (
            <>
                <button type="button" className={buttonClasses} onClick={onClick}>{this.props.children}</button>
            </>
        );
    }

}
