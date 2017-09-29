import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './BracketInput.css';
import {decodeChallongeUrl} from "./Utils";

export default class BracketInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };

        this.onClick = this.onClick.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
    }

    onClick() {
        let tourney;
        if (this.state.url !== null && (tourney = decodeChallongeUrl(this.state.url))) {
            this.props.history.push(tourney + '/standings');
        } else {
            // TODO: Show some error.
            console.log("Yo that url is invalid.");
        }
    }

    onUrlChange(e) {
        this.setState({url: e.target.value})
    }

    render() {
        return (
            <div className="bracketContainer">
                <form onSubmit={this.onClick}>
                    <input type="text" value={this.state.bracketUrl} onSubmit={this.onClick} onChange={this.onUrlChange} className="bracketInput" />
                    <input type="submit" value="Bracket URL" className="bracketSubmit" />
                </form>
            </div>
        )
    }
}