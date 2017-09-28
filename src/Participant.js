import React, { Component } from 'react'
import {corsAnywherePrefix, embedURIParams} from "./Utils";
import {challongeApiKey} from "./Creds";
import './Participant.css'

export default class Participant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: null
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.detailsRequest = this.detailsRequest.bind(this);
    }

    detailsRequest() {
        const params = {
            api_key: challongeApiKey,
            include_matches: 1
        };

        const uri = corsAnywherePrefix() +
          "https://api.challonge.com/v1/tournaments/" + encodeURIComponent(this.props.tourney) +
          "/participants/" + encodeURIComponent(this.props.id) +
          ".json";

        return embedURIParams(uri, params);
    }

    componentWillMount() {
        const that = this;
        if (!that.didFetchParticipants) {
            that.didFetchParticipants = false;
            fetch(this.detailsRequest(), {
                headers: {
                    'Accept': 'application/json',
                }
            }).then((resp) => {
                return resp.json();
            }).then((json) => {
                that.setState((st) => {
                    st.details = json["participant"]
                });
                that.didFetchParticipants = true;
            }).catch((e) => {
                that.didFetchParticipants = false;
            });
        }
    }

    render() {
        return (<div className="partContainer">
            <div className="partPlacing">{this.props.final_rank}</div>
            <div className="partName">{this.props.name}</div>
            <div className="partSeed">{this.props.seed}</div>
        </div>);

    }
}