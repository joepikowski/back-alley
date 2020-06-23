import React from 'react';
import './NavBar.module.css'
import BackAlleyIcon from './backalley-icon.png'

export default class NavBar extends React.Component {

    render(){
        return (
            <div className="navbar-wrapper row mb-2">
                <nav className="navbar navbar-light pt-0 pb-0">
                    <img className="navbar-image d-inline-block align-top mr-2" src={BackAlleyIcon} />
                    <b className="navbar-text">Back Alley</b>
                </nav>
            </div>
        );
    }
}
