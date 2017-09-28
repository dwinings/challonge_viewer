import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import ParticipantsView from "./ParticipantsView";
import Overview from "./Overview";
import {routeSplatter} from "./Utils";

export default class TournamentView extends Component {
    render() {
        return (
            <div style={{paddingTop: '15px'}} >
                <Switch>
                    <Route path="/:tourney/standings" component={routeSplatter(ParticipantsView)} />
                    <Route path="/:tourney/overview" component={routeSplatter(Overview)}/>
                </Switch>
            </div>
        );
    }
}