import React from 'react';
import { Table } from 'react-bootstrap';


const getScoreboard = (players) => {
    const scoreBoard = players.filter(players => players.WPM !== -2);
    return scoreBoard.sort((a, b) => a.WPM > b.WPM ? -1 : 1);
}


const GameReview = ({ gameState }) => {
    const scoreBoard = getScoreboard(gameState.players)
    return (
        <div className="card-container">
            <h2>Game Review</h2>
            <h5>Quote</h5>
            <p>"{gameState.quote}"</p>
            <p> - {gameState.author}</p>
            <br></br>
            <h5>Scoreboard</h5>

            <div className="game-review">
                <Table classname="review-table" striped bordered responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>WPM</th>
                        </tr>
                    </thead>
                    <tbody> {
                        scoreBoard.map((player, index) => {
                            return <tr>
                                <td>{index + 1}</td>
                                <td>{player.nickName}</td>
                                <td>{player.WPM}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}


export default GameReview;