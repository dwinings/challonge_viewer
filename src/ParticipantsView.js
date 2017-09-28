import React, { Component } from 'react'
import Participant from "./Participant";
import {challongeApiKey} from "./Creds";
import {corsAnywherePrefix} from "./Utils";

export default class ParticipantsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            participants: null
        };

        this.didFetchParticipants = false;
        this.componentWillMount = this.componentWillMount.bind(this);
        this.tourneyRequest = this.tourneyRequest.bind(this);
        this.participants = this.participants.bind(this);
    }


    tourneyRequest() {
        return `${corsAnywherePrefix()}https://api.challonge.com/v1/tournaments/${this.props.tourney}/participants.json?api_key=${challongeApiKey}`
    }

    componentWillMount() {
        const that = this;
        if (!that.didFetchParticipants) {
            that.didFetchParticipants = false;
            fetch(this.tourneyRequest(), {
                headers: {
                    'Accept': 'application/json',
                }
            }).then((resp) => {
                return resp.json();
            }).then((json) => {
                that.setState((st) => {
                    st.participants = json
                });
                that.didFetchParticipants = true;
            }).catch((e) => {
                that.didFetchParticipants = false;
            });
        }
    }

    participants() {
        if (!this.state.participants) {
            return [];
        }

        return this.state.participants.map((p) => {return p.participant;}).sort((a, b) => {
            let ascore = a.final_rank || a.seed;
            let bscore = b.final_rank || b.seed;
            return ascore - bscore;
        })
    }

    render() {
        return (
            <div style={{width: '80%', margin: 'auto'}}>
                {
                    this.participants().map((p) =>
                        <Participant key={p.id} {...p} tourney={this.props.tourney} />
                    )
                }
            </div>
        )
    }
}
