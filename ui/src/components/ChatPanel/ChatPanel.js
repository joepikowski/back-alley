import React from 'react';
import './ChatPanel.module.css'

export default class ChatPanel extends React.Component {

    handleSubmit(ref, callback, e){
        e.preventDefault();
        callback(ref.current.value);
        ref.current.value = null;
    }

    render(){
        const chatInput = React.createRef();
        const onSubmit = this.handleSubmit.bind(this, chatInput, this.props.onSubmit);
        return (
            <div className="row">
                <form className="chat-form" onSubmit={onSubmit}>
                    <input type="text" className="chat-input" ref={chatInput}></input>
                    <input type="submit" className="chat-submit" value="📩"></input>
                </form>
            </div>
        );
    }

}
