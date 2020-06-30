import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerTime: 0,

            correctChars: props.corChars,
            errorsCnt: props.errorCnt,

            isStarted: props.isGameStarted,
            isFinished: props.isGameFinished,
        }
        this.startTimer();
    }

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
            this.setState({
                timerTime: Date.now() - this.state.timerStart
            });
        }, 1000);
    };

    render() {
                // let minutes = ("0" + (Math.floor(this.state.timerTime / 60000) % 60)).slice(-2);
        // let seconds = ("0" + (Math.floor(this.state.timerTime / 1000) % 60)).slice(-2);
        // let elapsedSec = (Math.floor(this.state.timerTime / 1000));
        // let wpm = Math.round((this.state.correctChars / 5)/(elapsedSec/ 10 /60));
        return (
            <>
                <p className="timer">Timer: {this.state.timerTime}</p>
                {/* <p className="WPM">WPM: {wpm}</p> */}
            </>
        )
    }
}
export default Timer;