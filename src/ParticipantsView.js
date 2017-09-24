import React, { Component } from 'react'

export default class ParticipantsView extends Component {
    apiKey = 'nope';

    constructor(props) {
        super(props);

        this.state = {
            respBody: null
        };

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    tourneyRequest() {
        return `https://api.challonge.com/v1/tournaments/${this.props.orgPrefix}${this.props.tourneyId}/participants.json?api_key=${this.apiKey}`
    }

    componentDidUpdate() {
        let that = this; // Lexical scoping can actually go die.
        fetch(this.tourneyRequest(), {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            return resp.blob();
        }).then((json) => {
            json = JSON.parse(json);
            that.setState((st) => {st.respBody = json});
        });
    }

    render() {
        return (
            <div>
                {this.state.respBody}
            </div>
        )
    }




}
