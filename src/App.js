import React, { Component } from 'react';
import BracketInput from './BracketInput'
import TournamentView from './TournamentView'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bracketUrl: null
        };

        this.onBracketSubmit = this.onBracketSubmit.bind(this);
    }

    onBracketSubmit(url) {
        this.setState({bracketUrl: url});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to the challonge viewer.</h2>
                </div>

                <BracketInput onSubmit={this.onBracketSubmit}/>
                <TournamentView url={this.state.bracketUrl}/>
            </div>
        );
    }
}

export default App;
