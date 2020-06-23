import React from 'react'
import './GameLogPanel.module.css'

export default class GameLogPanel extends React.Component {

    constructor(props){
        super(props);
        this.scrollable = React.createRef();
        this.scrollMonitor;
        this.currentPos;
        this.oldBottom;
        this.newBottom;
        this.wasAtBottom = false;
    }

    componentDidMount(){
        this.scrollMonitor = setInterval(() => {
            this.currentPos = this.scrollable.current.scrollTop;
            this.newBottom = this.scrollable.current.scrollHeight - this.scrollable.current.clientHeight;
            this.wasAtBottom = (this.currentPos + 1) >= this.oldBottom;

            if (this.newBottom > this.oldBottom && this.wasAtBottom){
                this.scrollable.current.scrollTop = this.scrollable.current.scrollHeight - this.scrollable.current.clientHeight;
            }

            this.oldBottom = this.newBottom;
        }, 500);
    }

    componentWillUnmount(){
        clearInterval(this.scrollMonitor);
    }

    render(){
        return (
            <div className="game-log-panel row card scrollable" ref={this.scrollable}>
                <div className="game-log-panel-rows container-fluid">
                    <table className="table table-striped">
                        <thead></thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}
