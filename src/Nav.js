import React, {Component} from 'react';
import {IndexLink, withRouter} from 'react-router';
import logo from './logo.svg';
import './Nav.css';

class Nav extends Component {
    tourney() {
        return this.props.router.params && this.props.router.params.tourney ? this.props.router.params.tourney : null
    }

    standingsLink() {
        return this.tourney()
            ? '/' + this.tourney()  + '/standings'
            : '/null-tourney-pls';
    }

    overviewLink() {
        return this.tourney()
            ? '/' + this.tourney()  + '/overview'
            : '/null-tourney-pls';
    }

    render() {
        return (
            <div>
                <ul className="nav">
                    <li className="nav-el">
                        <a href="/">
                            <img src={logo} className="App-logo" alt="logo" />
                        </a>
                    </li>
                    <li className="nav-el">
                        <IndexLink className="active" to="/">Challonge Bracket Viewer</IndexLink>
                    </li>
                    <li className="nav-el">
                        <IndexLink activeClassName="active" to={this.overviewLink()}>Status</IndexLink>
                    </li>
                    <li className="nav-el">
                        <IndexLink activeClassName="active" to={this.standingsLink()}>Standings</IndexLink>
                    </li>
                </ul>

                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Nav);
