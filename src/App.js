import React, { Component } from 'react';
import BracketInput from './BracketInput'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.onBracketSubmit = this.onBracketSubmit.bind(this);
    }

    onBracketSubmit(url) {
        console.log(`Got bracket submit: ${url}`);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <BracketInput onSubmit={this.onBracketSubmit}/>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
