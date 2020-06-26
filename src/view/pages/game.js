import React, { Component } from 'react';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
          prompt: "Listen carefully, my friend. You are stuck in a paradox. It turns out there are three things you cannot do in virtual reality. You cannot die, you cannot get grounded, and you cannot call customer service. This is why you are having problems.",
        }
    }
    render() {
        var characters=[];
        for (var i = 0; i < this.state.prompt.length;i++) {
            characters.push(<Character value={this.state.prompt.charAt(i)} />);
        }
        return (
            <div className="container">
                <div className="card-container">
                    <p>Game</p>
                        <div className="prompt-container">

                        </div>

                        <div className="user-input"></div>
                </div>
            </div>
        )
    }
}

const Character = (props) => {
    return (
        <a className="character">props.value</a>
    )
}

// use bootstrap card

export default Game;