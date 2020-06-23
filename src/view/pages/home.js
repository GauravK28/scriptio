import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import Game from "./view/pages/game";


export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <p>Welcome to Script.io</p>
                <div>
                    <Router>
                        <Link to="/game">
                            <Button variant="primary">Start Game </Button>
                        </Link>

                        <Route  path="/game">
                            <Game />
                        </Route>
                    </Router>

                </div>

            </div>
        )
    }
}