import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import logo from './logo.svg';
import './Nav.css';

class Nav extends Component {
    tourney() {
        return this.props.router.params && this.props.router.params.tourney ? this.props.router.params.tourney : null
    }

    standingsLink() {
        return this.tourney()
            ? '/' + this.tourney()  + '/standings'
            : '/';
    }

    overviewLink() {
        return this.tourney()
            ? '/' + this.tourney()  + '/overview'
            : '/';
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
                        Challonge Bracket Viewer
                    </li>
                    <li className="nav-el">
                        <Link activeClassName="active" to="/" >Tourney</Link>
                    </li>
                    <li className="nav-el">
                        <Link activeClassName="active" to={this.overviewLink()}>Status</Link>
                    </li>
                    <li className="nav-el">
                        <Link activeClassName="active" to={this.standingsLink()}>Standings</Link>
                    </li>
                </ul>

                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Nav);
