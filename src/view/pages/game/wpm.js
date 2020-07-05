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
    
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                correctChars: nextProps.corChars,
                errorsCnt: nextProps.errorCnt,

                isStarted: nextProps.isGameStarted,
                isFinished: nextProps.isGameFinished,
            });
        }
    }

    componentDidUpdate(prevProps) {
        // if (this.props.isGameStarted) {
        //     this.startTimer();
        // }
        if (this.props.isGameFinished !== prevProps.isGameFinished) {
            this.stopTimer();
        }
      }

    // componentWillMount() {
    //     this.startTimer();
    // }

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
        }, 10);
    };

    stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.timer);
      };
      resetTimer = () => {
        this.setState({
          timerStart: 0,
          timerTime: 0
        });
      };

    render() {
        let minutes = Math.floor(this.state.timerTime/(1000*60))%60; 
        let seconds = Math.floor(this.state.timerTime/1000)%60;
        let wpm = Math.round((this.state.correctChars / 5) / (this.state.timerTime / 1000 / 60));
        return (
            <>
                <p className="timer">Timer: {minutes < 10 ?  '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds} </p>
                
                {/*implement countdown here, once zero, create function in game and pass down as props to wpm then
                    to countdown, so countdown can notify game, when it hits zero, then game can update to isStarted,
                    and timer can remove the Countdown */}

                <p className="WPM">WPM: {wpm}</p>
            </>
        )
    }
}
export default Timer;