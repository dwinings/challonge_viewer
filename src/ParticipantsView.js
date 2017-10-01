import React, { Component } from 'react'
import Participant from "./Participant";

export default class ParticipantsView extends Component {
    render() {
        return (
            <div>
                {
                    this.props.participants.map((p) =>
                        <Participant key={p.id} {...p} tourney={this.props.tourneyData} />
                    )
                }
            </div>
        )
    }
}
