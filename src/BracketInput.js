import React, { Component } from 'react'
import './BracketInput.css'

export default class BracketInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bracketUrl: ""
        };

        this.onClick = this.onClick.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
    }

    onClick() {
        if (typeof this.props.onSubmit === "function") {
            this.props.onSubmit(this.state.bracketUrl);
        }
    }

    onUrlChange(e) {
        this.setState({bracketUrl: e.target.value})
    }

    render() {
        return (
            <div className="bracketContainer">
                <input type="text" value={this.state.bracketUrl} onChange={this.onUrlChange} className="bracketInput" />
                <div className="bracketSubmit" onClick={this.onClick}>Bracket URL</div>
            </div>
        )
    }
}