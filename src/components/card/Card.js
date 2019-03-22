import React, {Component} from 'react';
import './card.css';
import logo from './logo_hwat.png';

export default class Card extends Component {
    render() {
        return (
            <div className='App'>
                <div class="login-card">
                    <h1>{this.props.title}</h1>
                    <div class="image-container">
                        <img src={logo} alt="logo"></img>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}