import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Game from "./singleplayer/game";

class Practice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            isStarted: false,
            gameCnt: 0,
            
            isCurrentFinished: false,
            quote: "",
        }
    }

    componentDidMount() {
        this.getNewQuote();
    }

    getNewQuote = async () => {
        try {
          const response = await fetch("https://api.quotable.io/random");
          const data = await response.json();
          if (!response.ok) throw new Error(data);
          this.setState({ 
              quote: data,
            });
        } catch (error) {
          // If the API request failed, log the error to console and update state
          // so that the error will be reflected in the UI.
          console.error(error);
          this.setState({ 
              quote: { content: "Opps... Something went wrong" } 
            });
        }
      };

    handleStart() {
        this.getNewQuote();
        this.setState({
            isStarted: true,
            isCurrentFinished: false,
            gameCnt: this.state.gameCnt + 1,
        });
    }

    getGameStatus(status) {
        if (status) {
            this.setState({
                isCurrentFinished: true,
            });
        }
    }


    render() {
        return (
            <div className="container">
                <div className="top-bar">
                    <p className="title">Practice Mode</p>
                    <p className="next-game">
                        {this.state.isCurrentFinished ?
                            <Button variant="primary" onClick={() => this.handleStart()}>Next Game</Button> : null
                        }
                    </p>
                    <br></br>
                    {/* <div className="description">Hone your typing skills with instant single player races.</div> */}
                </div>
                {!this.state.isStarted ?
                    <div className="card-container">
                        <div className="user-input">
                            <Button className="StartPractice" size="lg" block variant="primary" onClick={() => this.handleStart()} >Start Practice</Button>
                        </div>
                    </div>: null
                }


                {this.state.isStarted ?
                    <Game quote={this.state.quote} 
                            status={this.getGameStatus.bind(this)} 
                            key={this.state.gameCnt}/> : null
                }
            </div>
        )
    }
}
export default Practice;


// onClick={() => this.startGame()}