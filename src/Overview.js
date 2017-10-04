import React, {Component} from 'react';
import UpcomingMatches from "./UpcomingMatches";

export default class Overview extends Component {
    tournamentCompleted() {
        return this.props.state === 'complete';
    }

    render() {
        return (
            <div>
                {
                    !this.tournamentCompleted()
                        ? <UpcomingMatches matches={this.props.matches}/>
                        : 'No matches left to show'
                }
            </div>
        )
    }
}