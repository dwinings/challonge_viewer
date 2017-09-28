import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BracketInput from './BracketInput'
import TournamentView from './TournamentView'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to the challonge viewer.</h2>
                </div>

                <Router>
                    <Switch>
                        <Route path="/:tourney" component={TournamentView}/>
                        <Route component={BracketInput} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
