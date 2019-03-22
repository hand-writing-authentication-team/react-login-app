import React, {Component} from 'react';
import './card.css';

export default class Card extends Component {
    render() {
        return (
            <div className='App'>
                <div class="login-card">
                    <h1>{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
}