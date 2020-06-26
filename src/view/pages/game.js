import React, { Component } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prompt: "Listen carefully, my friend. You are stuck in a paradox. It turns out there are three things you cannot do in virtual reality. You cannot die, you cannot get grounded, and you cannot call customer service. This is why you are having problems.",
        }
    }
    render() {
        var characters = [];
        for (var i = 0; i < this.state.prompt.length; i++) {
            characters.push(<Character value={this.state.prompt.charAt(i)} />);
        }
        return (
            <div className="container">
                <div className="card-container">
                    <p>Gæm</p>
                    <div className="prompt-container">
                        {characters}
                    </div>
                    <br></br>
                    <div className="user-input">
                        <InputGroup size="sm" className="mb-3">
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                    </div>
                </div>
            </div>
        )
    }
}

const Character = (props) => {
    if (props.value === " ") {
        return (
            <>
                <br></br>
                <a className="character-space"> </a>
            </>
        )
    }
    return (
        <a className="character">{props.value}</a>
    )
}

//<div style={{backgroundColor: this.state.backgroundcolor}}></div>

export default Game;