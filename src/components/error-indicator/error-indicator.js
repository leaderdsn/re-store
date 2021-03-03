import React, { Component } from 'react';
import './error-indicator.css';
import icon from './error-img.png';

export default class ErrorIndicator extends Component {

    render(){
        return (
            <div class="error-indicator">
                <img src={ icon } alt="error icon" />
                <span className="boom">UPS!</span>
                <span>
                    something has gone terribly wrong
                </span>
                <span>
                    (but we already sent droids to fix it)
                </span>
            </div>
        );
    };
}
