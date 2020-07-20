import React from 'react';
import { ProgressBar } from 'react-bootstrap';


const PlayerInfo = ({ nickName, WPM, progress }) => {
    return (
        <>
            <div className="player-info">
                <p className="timer">{nickName}</p>
                <ProgressBar now={progress} />
                <p className="WPM">{WPM === -1 ? 0 : WPM} WPM</p>
                <br></br>
            </div>

        </>
    )
}

export default PlayerInfo;
