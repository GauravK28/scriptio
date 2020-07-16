import React, { Component } from 'react';
import {useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Game from "../singleplayer/game";


const Home = props => {
    let history = useHistory();
    return (
        <div className="container">
            <div className="card-container">
                <h3>Welcome to Script.io</h3>
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

// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             shouldLoadGame: false,
//         }
//     }

//     loadCreateMenu() {
//         this.setState({
//             shouldLoadGame: true,
//         })
//     }

//     render() {
//         if (this.state.shouldLoadGame) {
//             return (<Game />)
//         }
//         else {
//             return (
//                 <div className="container">
//                     <div className="card-container">
//                         <h3>Welcome to Script.io</h3>
//                         <div className="game-info">
//                             <Button className="home" variant="primary"
//                                     onClick={() => this.loadCreateMenu()}>Create Game </Button>
//                             <Button className="home" variant="secondary" 
//                                     onClick={() => this.loadGame()}>Join Game</Button>
//                         </div>
//                     </div>
//                 </div>
//             )
//         }
//     }
// }

export default Home;