import React, {Component} from 'react';

export default class UpcomingMatch extends Component {
    roundString() {
        let prefix = this.props.round > 0 ? 'Winners ' : 'Losers ';
        return prefix + 'R' + Math.abs(this.props.round).toString()
    }

    render() {
        return (
            <div style={{border: '1px solid black', padding: '5px', margin: '5px'}}>
                <div>
                    <span style={{fontSize: '24px', paddingRight: '10px'}}>
                        {this.roundString()}
                    </span>
                    <span>
                        {this.props.player1.name}({this.props.player1.id}) vs.
                        {this.props.player2.name}({this.props.player2.id})
                    </span>
                </div>
            </div>
        );
    }
}