import React from 'react';
import './GameControls.module.css'
import { ControlButton } from '..'

export default class GameControls extends React.Component {

    getButtonConfig(props){
        return [
            {
                id: 'join',
                content: 'Join Game',
                style: 'primary',
                display: ( !this.props.gameStarted && !this.props.youAreSeated ),
                onClick: props.controls.addPlayer
            },
            {
                id: 'unjoin',
                content: 'Unjoin Game',
                style: 'warning',
                display: ( !this.props.gameStarted && this.props.youAreSeated ),
                onClick: props.controls.removePlayer
            },
            {
                id: 'start',
                content: 'Start Game',
                style: 'success',
                display: !this.props.gameStarted,
                onClick: props.controls.startGame
            },
            {
                id: 'logout',
                content: 'Log Out',
                style: 'secondary',
                display: true,
                onClick: props.controls.logOut
            },
            {
                id: 'undo',
                content: 'Undo Last Move',
                style: 'info',
                display: !this.props.undoUnlocked,
                onClick: props.controls.setUndoUnlock
            },
            {
                id: 'undo-check',
                content: 'Are You Sure?',
                style: 'danger',
                display: this.props.undoUnlocked,
                onClick: props.controls.handleUndoClick
            },
            {
                id: 'reset',
                content: 'Reset Game',
                style: 'light',
                display: !this.props.resetUnlocked,
                onClick: props.controls.setResetUnlock
            },
            {
                id: 'reset-check',
                content: 'Are You Sure?',
                style: 'danger',
                display: this.props.resetUnlocked,
                onClick: props.controls.handleResetClick
            }]
        ;
    }

    render(){
        const config = this.getButtonConfig(this.props);
        const controlButtons = config.filter( (button) => button.display ).map( (button) => {
            return (
                <ControlButton key={button.id} style={button.style} clickHandler={button.onClick}>
                    {button.content}
                </ControlButton>
            );
        });

        return (
            <div className="game-controls row text-center pt-3">
                {controlButtons}
            </div>
        );
    }

}
