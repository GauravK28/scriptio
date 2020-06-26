import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import Game from "./game";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldLoadGame: false,
        }
    }

    loadGame() {
        this.setState({
            shouldLoadGame: true,
        })
    }

    render() {
        if (this.state.shouldLoadGame) {
            return (<Game />)
        }
        else {
            return (
                <div className="container">
                    <div className="card-container">
                        <p>Welcome to Script.io</p>
                        <div>
                            <Button variant="primary" onClick={() => this.loadGame()}>Start Game </Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Home;