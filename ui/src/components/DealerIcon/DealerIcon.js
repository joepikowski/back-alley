import React from 'react'
import './DealerIcon.module.css'
import DealerIconImage from './dealer-icon.png'

export default class DealerIcon extends React.Component {

    render(){
        const imageClasses = `dealer-icon-image dealer-icon-image-${this.props.display ? this.props.display : 'block'}`;
        return (
            <div className={`${imageClasses} ${this.props.className ? this.props.className : ''}`} >
                <img className={imageClasses} src={DealerIconImage} />
            </div>
        );
    }

}
