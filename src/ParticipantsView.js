import React, { Component } from 'react'
import Participant from "./Participant";

export default class ParticipantsView extends Component {
    sortedParticipants() {
        return Object.values(this.props.participants).sort((l, r) => {
            let lscore = l.final_rank || l.seed;
            let rscore = r.final_rank || r.seed;
            return lscore - rscore;
        });
    }
    render() {
        return (
            <div>
                {
                    this.sortedParticipants().map((p) =>
                        <Participant key={p.id} {...p} tourney={this.props.tourneyData} />
                    )
                }
            </div>
        )
    }
}
