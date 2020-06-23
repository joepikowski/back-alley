import React from 'react'
import './Header.module.css'
import { DealerIcon } from '..'

export default class Header extends React.Component {

    render(){
        const dealerIsYou = this.props.dealer === this.props.yourName;
        return(
            <div className="game-header row mt-4">
                <div className="container">
                    <div className="row mt-1">
                        <div className="col"><h5>Round: {this.props.round}</h5></div>
                        <div className="col">
                            <h5 className="game-header-inline">Dealer: {dealerIsYou ? 'You' : this.props.dealer}</h5>
                            {(dealerIsYou && <DealerIcon className="ml-1 pb-1 game-header-align-top" display="inline" />)}
                        </div>
                        <div className="col text-nowrap"><h5>Your Bid:  {this.props.tricks} / {this.props.bid}</h5></div>
                        <div className="col text-nowrap"><h5>Total Bids:  {this.props.totalBids} / {this.props.round}</h5></div>
                    </div>
                </div>
            </div>
        );
    }
}
