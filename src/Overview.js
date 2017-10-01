import React, {Component} from 'react';
import UpcomingMatches from "./UpcomingMatches";

export default class Overview extends Component {
    render() {
        return (
            <div>
                <UpcomingMatches matches={this.props.matches} />
            </div>
        )
    }
}