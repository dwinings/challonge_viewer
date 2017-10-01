import React, {Component} from 'react';
import UpcomingMatch from "./UpcomingMatch";

export default class UpcomingMatches extends Component {
    constructor(props) {
        super(props);

        this.playableMatches = this.playableMatches.bind(this);
        this.matchIsPlayable = this.matchIsPlayable.bind(this);
    }

    playableMatches() {
        return Object.values(this.props.matches).filter(this.matchIsPlayable);
    }

    matchIsPlayable(match) {
        const that = this;
        const prereqs = match.prerequisite_match_ids_csv.split(',').map(Number);
        return prereqs.every((m_id) => {
            return m_id === 0 || that.props.matches[m_id].state === "complete"
        }) && match.state !== "complete";
    }

    render() {
        return (
            <div>
                {
                    this.playableMatches().map((m) =>
                        <UpcomingMatch key={m.id} {...m} />
                    )
                }
            </div>
        )
    }
}