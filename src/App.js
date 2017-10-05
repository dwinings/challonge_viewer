import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import BracketInput from './BracketInput'
import TournamentView from './TournamentView'
import Nav from "./Nav";
import './App.css';
import Overview from "./Overview";
import ParticipantsView from "./ParticipantsView";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={browserHistory}>
                    <Route path="/" component={Nav}>
                        <Redirect from="null-tourney-pls" to="/" />
                        <Route path=":tourney" component={TournamentView}>
                            <Route path="overview" component={Overview} />
                            <Route path="standings" component={ParticipantsView} />
                            <IndexRedirect to="overview" />
                        </Route>
                        <IndexRoute component={BracketInput} />
                    </Route>
                </Router>
            </div>
        );
    }
}

export default App;
