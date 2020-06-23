import React from 'react'
import './BidPanel.module.css'

export default class BidPanel extends React.Component {

    handleSubmit(ref, callback, e){
        e.preventDefault();
        console.log(ref.current.value);
        callback(ref.current.value);
        ref.current.value = null;
    }

    render(){
        const bidInput = React.createRef();
        const panelFormClasses = `${this.props.yourTurnToBid ? 'bid-panel-prompt-action' : ''} row card`;
        const onSubmit = this.handleSubmit.bind(this, bidInput, this.props.onSubmit);

        return (
            <div className="bid-panel pt-3">
                <h4>Make a Bid</h4>
                <div className={panelFormClasses}>
                    <form className="pt-3" onSubmit={onSubmit}>
                        <input type="number" className="bid-panel-input" min="0" ref={bidInput}></input>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
        );
    }

}
