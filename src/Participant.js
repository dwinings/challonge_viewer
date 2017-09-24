import React, { Component } from 'react'
import './Participant.css'

export default class Participant extends Component {
    render() {
        return (<div className="partContainer">
            <div className="partPlacing">{this.props.final_rank}</div>
            <div className="partName">{this.props.name}</div>
            <div className="partSeed">{this.props.seed}</div>
        </div>);

    }
}