import React from 'react'
import './GameLog.module.css'
import { GameLogPanel, ChatPanel } from '..'

export default class GameLog extends React.Component {

    render(){
        const logRows = this.props.log.map((line, i) => {
            return (<tr key={i}><td className="p-0">{line}</td></tr> );
        });

        return (
            <div className="game-log">
                <h4>Game Log</h4>
                <GameLogPanel>{logRows}</GameLogPanel>
                <ChatPanel onSubmit={this.props.onSubmit}/>
            </div>
        );
    }
}
