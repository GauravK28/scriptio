import React from 'react';
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';


const Home = props => {
    let history = useHistory();
    return (
        <div className="container">
            <div className="card-container">
                <h3>Welcome to Typemania</h3>
                <div className="game-info">
                    <Button className="home" variant="primary"
                            onClick={() => history.push('game/create')}>Create Game </Button>
                    <Button className="home" variant="secondary" 
                            onClick={() => history.push('game/join')}>Join Game</Button>
                </div>
            </div>
        </div>
    )
}


export default Home;