import React from 'react';
import { Redirect } from 'react-router-dom';

import Counter from './Counter';
import StartButton from './StartButton';
import DisplayWords from './DisplayWords.js';
import InputForm from './Form';
import PlayerInfo from './PlayerInfo';
import GameReview from './GameReview';
import GameCode from './GameCode';

import socket from '../../../socketConfig';


const GameEngine = ({ gameState }) => {
    const { _id, players, words, isOpen, isOver, quoteLength } = gameState;
    const player = players.find(player => player.socketID === socket.id);
    if (_id === "") {
        return <Redirect to="/" />
    }
    const prompt = processWords(words);

    let currentPlayer = players.find(player => player.socketID === socket.id);

    return (
        <div className="container">
            <div className="card-container">
                <PlayerInfo nickName={currentPlayer.nickName} WPM={currentPlayer.WPM} progress={Math.floor(100 * currentPlayer.correctChars / quoteLength)} />

                {players.map((player) => (
                    player.socketID !== socket.id ? <PlayerInfo nickName={player.nickName} WPM={player.WPM} progress={Math.floor(100 * player.correctChars / quoteLength)} />
                        : null
                ))}
                <div className="prompt-container">
                    <DisplayWords prompt={prompt} player={player} gameID={_id} />
                </div>
                <div className="user-input">
                    <br></br>
                    <InputForm isOpen={isOpen} isOver={isOver} gameID={_id} />
                    <br></br>
                    <StartButton player={player} gameID={_id} />
                </div>
                <Counter isOver={isOver} />

                {isOpen ? <div className="user-input">
                                <GameCode gameID={_id} />
                            </div> : null}
            </div>
            {isOver ? <GameReview gameState={gameState} /> : null}
        </div>
    )
}

const processWords = (words) => {
    let tempPrompt = [];
    for (let i = 0; i < words.length; i++) {
        tempPrompt.push({
            word: words[i],
            styling: "word",
            characters: function () {
                var elem = [];
                for (let j = 0; j < this.word.length; j++) {
                    elem.push({
                        character: this.word.charAt(j),
                        styling: "character",
                    })
                }
                elem.push({
                    character: " ",
                    styling: "character",
                })
                return elem;
            },
        })
    }

    // to eliminate character() function & to store as array instead
    for (let i = 0; i < tempPrompt.length; i++) {
        var temp = tempPrompt[i].characters();
        tempPrompt[i].characters = temp;
    }
    tempPrompt[tempPrompt.length - 1].characters.pop();

    return tempPrompt;
}

export default GameEngine;