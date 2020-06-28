import React, { Component } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';



class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "Listen carefully, my friend. You are stuck in a paradox. It turns out there are three things you cannot do in virtual reality. You cannot die, you cannot get grounded, and you cannot call customer service. This is why you are having problems.",
            rawInput: React.createRef(),
            prompt: [],
            textInput: ""
        }

        var words = this.state.quote.split(" ");
        for (var i = 0; i < words.length; i++) {
            this.state.prompt.push(<Word value={words[i]} key={i}/>)
        }
        
        /* need to rework setup,
            the arrays should onyl contain the words and characters
            the spans should be added with a map, 
            and if a letter matches, pass a prop

            using Array map for rendering
            http://www.hackingwithreact.com/read/1/13/rendering-an-array-of-data-with-map-and-jsx 

            dealing with "active" state
            https://stackoverflow.com/questions/41978408/changing-style-of-a-button-on-click 
            https://codepen.io/anon/pen/mepogj?editors=0010 

            maybe make an object called word, and map that to an array, 
            then the word object has the characters
                possibly useful to keep track of current word
        */
    }

    handleChange() {
        this.setState({
            textInput: this.state.rawInput.current.value,
        });
     }

    render() {

        return (
            <div className="container">
                <div className="card-container">
                    <p>Gæm</p>
                    <div className="prompt-container">
                        {this.state.prompt}
                    </div>
                    <br></br>
                    <br></br>
                    <div className="user-input">
                        <InputGroup size="lg">
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                placeholder="Start typing..."
                                ref={this.state.rawInput} type="text" onChange={() => this.handleChange()} />
                        </InputGroup>
                    </div>
                    <br></br>
                    <span>{this.state.textInput}</span>
                </div>
            </div>
        )
    }
}

const Word = (props) => {
    var characters = [];
    for (var i = 0; i < props.value.length; i++) {
        characters.push(<Character value={props.value.charAt(i)} key={i} />);
    }
    characters.push(<Character value={" "} />)
    return (
        <>
            <span className="word">
                {characters}
            </span>
        </>
    )
}

const Character = (props) => {
    if (props.value === " ") {
        return (
            <span className="character">&nbsp;</span>
        )
    }
    return (
        <span className="character">{props.value}</span>
    )
}

// style current word (grayish bar at top)
// correct letters (green background highlight)
// incorrect letters (red background highlight)
// current letter (blue bar at bottom)



export default Game;