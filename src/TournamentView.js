import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import ParticipantsView from "./ParticipantsView";
import Overview from "./Overview";
import {corsAnywherePrefix, embedURIParams, routeSplatter} from "./Utils";
import {challongeApiKey} from "./Creds";

export default class TournamentView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tourneyData: null
        };

        this.didFetchTourney = false;
        this.componentWillMount = this.componentWillMount.bind(this);
        this.tourneyRequest = this.tourneyRequest.bind(this);
    }

    tourneyRequest() {
        const params = {
            api_key: challongeApiKey,
            include_matches: 1,
            include_participants: 1
        };
        return embedURIParams(
            `${corsAnywherePrefix()}https://api.challonge.com/v1/tournaments/${this.props.match.params.tourney}.json`,
            params
        );
    }

    componentWillMount() {
        const that = this;
        if (!that.didFetchTourney) {
            fetch(this.tourneyRequest(), {
                headers: {
                    'Accept': 'application/json',
                }
            }).then((resp) => {
                return resp.json();
            }).then((json) => {
                let participants = json.tournament.participants.map((p) => {return p.participant;});
                let matches = json.tournament.matches.map((m) => {return m.match;});
                json.tournament.participants = {};
                participants = this.participantsWithMatches(participants, matches);
                participants.forEach((p) => {
                    json.tournament.participants[p.id] = p;
                });

                json.tournament.matches = {};
                matches.forEach((m) => {
                    m.player1 = m.player1_id ? json.tournament.participants[m.player1_id] : null;
                    m.player2 = m.player2_id ? json.tournament.participants[m.player2_id] : null;
                    json.tournament.matches[m.id] = m;
                });


                that.setState((st) => {
                    st.tourneyData = json.tournament; that.didFetchTourney = true;});
            }).catch((e) => {
                that.didFetchTourney = false;
            });
        }
    }

    participantsWithMatches(participants, matches) {
        // Add each participants matches to them and then return sorted by placing.
        const rval = participants.map((p) => {
            p['matches'] = matches.filter((match) => {
                return match.player1_id === p.id || match.player2_id === p.id;
            });
            return p;
        }).sort((l, r) => {
            let lscore = l.final_rank || l.seed;
            let rscore = r.final_rank || r.seed;
            return lscore - rscore;
        });
        return rval;
    }

    render() {
        return (
            <div style={{paddingTop: '15px', width: '80%', margin: 'auto'}} >
                {   this.didFetchTourney &&
                    <Switch>
                        <Route path="/:tourney/standings"
                               component={routeSplatter(ParticipantsView, {participants: Object.values(this.state.tourneyData.participants)})}/>
                        <Route path="/:tourney/overview"
                               component={routeSplatter(Overview, this.state.tourneyData)}/>
                    </Switch>
                }
            </div>
        );
    }
}