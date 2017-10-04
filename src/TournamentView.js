import React, {Component} from 'react';
import {Route, withRouter} from 'react-router'
import ParticipantsView from "./ParticipantsView";
import Overview from "./Overview";
import {corsAnywherePrefix, embedURIParams, routeSplatter} from "./Utils";

class TournamentView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tourneyData: null
        };

        this.didFetchTourney = false;
        this.componentWillMount = this.componentWillMount.bind(this);
        this.tourneyRequest = this.tourneyRequest.bind(this);
        this.augmentChildren = this.augmentChildren.bind(this);
    }

    tourneyRequest() {
        return 'http://claustroful.space:9292/api/bracket/' + this.props.params.tourney;
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
                console.log("Oi I died");
                console.log(e);
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
        });
        return rval;
    }

    augmentChildren() {
        if (!this.didFetchTourney) { return; }

        let that = this;
        return React.Children.map(this.props.children, child =>
           React.cloneElement(child, that.state.tourneyData)
        );
    }

    render() {
        this.augmentChildren();
        return (
            <div style={{paddingTop: '15px', width: '80%', margin: 'auto'}} >
                { this.didFetchTourney && this.augmentChildren() }
            </div>
        );
    }
}

export default withRouter(TournamentView);