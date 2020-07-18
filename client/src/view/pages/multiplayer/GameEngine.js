import React from 'react';
import { Redirect } from 'react-router-dom';
import Counter from './Counter';
import StartButton from './StartButton';

import socket from '../../../socketConfig';

// const findPlayer = players => {
//     return players.find(players => player.socketID === socket.id);
// }

const GameEngine = ({ gameState }) => {
    const { _id, players } = gameState;
    const player = players.find(player => player.socketID === socket.id);
    if (_id === "") {
        return <Redirect to="/" />
    }
    return (
        <div className="container">
            <div className="card-container">
                <Counter />
                <div className="user-input">
                    <StartButton player={player} gameID={_id} />

                </div>
            </div>
            <div>Players:
                {players.map((player, index2) => (
                    <div>{player.nickName}</div>
                ))}
            </div>
        </div>
    )

}

export default GameEngine;