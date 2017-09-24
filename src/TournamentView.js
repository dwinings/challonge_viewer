import React, {Component} from 'react'
import ParticipantsView from "./ParticipantsView";

export default class TournamentView extends Component {
    urlRegex = /.*\/\/(?:(.*).)?challonge.com\/(.*)\/?/;

    constructor(props) {
        super(props);

        this.state = {
            orgPrefix: null,
            tourneyId: null
        };

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== null) {
            let match = this.urlRegex.exec(nextProps.url);
            let orgPrefix = "";
            let tourneyId = null;

            if (match !== null) {
                if (match[1].length > 0) {
                    orgPrefix = match[1] + "-";
                }
                tourneyId = match[2]
            }

            this.setState({orgPrefix: orgPrefix, tourneyId: tourneyId});
        }
    }

    haveTourney() {
        return this.state.tourneyId !== null;
    }

    render() {
        return (
            <div>
                { this.haveTourney() &&
                    <ParticipantsView orgPrefix={this.state.orgPrefix} tourneyId={this.state.tourneyId}/>
                }
            </div>
        );
    }
}