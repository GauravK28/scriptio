import React, { Component } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "Listen carefully, my friend. You are stuck in a paradox. It turns out there are three things you cannot do in virtual reality. You cannot die, you cannot get grounded, and you cannot call customer service. This is why you are having problems.",
        }
    }
    render() {
        
        var prompt = [];

        var words = this.state.quote.split(" ");
        for (var i = 0; i < words.length; i++) {
            if (i != words.length - 1) {
                prompt.push(<Word value={words[i]} />);
            } else {
                prompt.push(<Word value={words[i]} />);
            }
        }


        return (
            <div className="container">
                <div className="card-container">
                    <p>Gæm</p>
                    <div className="prompt-container">
                        {prompt}
                    </div>
                    <br></br>
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

const Word = (props) => {
    var characters = [];
    for (var i = 0; i < props.value.length; i++) {
        characters.push(<Character value={props.value.charAt(i)} />);
    }
    characters.push(<Character value={" "}/>)
    return (
        <>
        <span className="word">
            {characters}
        </span>
        </>
    )
}

const Character = (props) => {
    if (props.value === " "){
        return(
            <span className="space-character">&nbsp;</span>
        )
    }
    return (
        <span className="character">{props.value}</span>
    )
}

//<div style={{backgroundColor: this.state.backgroundcolor}}></div>

export default Game;