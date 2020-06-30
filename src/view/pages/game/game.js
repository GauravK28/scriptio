import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Timer from "./timer"


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "Listen carefully, my friend. You are stuck in a paradox. It turns out there are three things you cannot do in virtual reality. You cannot die, you cannot get grounded, and you cannot call customer service. This is why you are having problems.",
            rawInput: React.createRef(),
            prompt: [],
            textInput: "",

            correctChars: 0,
            errorCnt: 0,

            isStarted: false,
            isFinished: false,

        }

        var words = this.state.quote.split(" ");

        for (let i = 0; i < words.length; i++) {
            this.state.prompt.push({
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
        for (let i = 0; i < this.state.prompt.length; i++) {
            var temp = this.state.prompt[i].characters();
            this.state.prompt[i].characters = temp;
        }
        
        
    }

    handleChange() {
        var corCharCnt = 0;
        var incCharCnt = 0;
        let temp = this.state.rawInput.current.value;

        if (temp.size == 1) {
            this.setState({
                isStarted: true,
            });
        }

        var testChar = "";
        var corChar = "";
        var index = 0;
        var tempPrompt = this.state.prompt.slice();

        for (let i = 0; i < tempPrompt.length; i++) {
            var characters = tempPrompt[i].characters;
            for (let j = 0; j < characters.length; j++) {
                corChar = characters[j].character;
                testChar = temp.charAt(index);

                if (testChar === "") {
                    tempPrompt[i].characters[j].styling = "character";
                } else if (testChar == corChar) {
                    tempPrompt[i].characters[j].styling = "character correct";
                    corCharCnt++;
                }
                else if (testChar != corChar) {
                    tempPrompt[i].characters[j].styling = "character incorrect";
                    incCharCnt++;
                }
                index++;
            }
        }

        this.setState({
            textInput: this.state.rawInput.current.value,
            prompt: tempPrompt,
            correctChars: corCharCnt,
            errorCnt: incCharCnt,
        });
    }

    startGame() {
        this.setState({
            isStarted: true,

        });
    }

    render() {
        return (
            <div className="container">
                <div className="card-container">
                    <Timer />
                    <div className="prompt-container">
                        {this.state.prompt.map((word, index) => (
                            <span className={word.styling}>
                                {word.characters.map((character, index2) => (
                                    <span className={character.styling}>{character.character}</span>
                                ))}
                            </span>
                        ))}
                    </div>
                    <br></br>
                    <br></br>
                    <div className="user-input">
                        <InputGroup size="lg">
                            <FormControl autoFocus aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                placeholder="Start typing..."
                                ref={this.state.rawInput} type="text" onChange={() => this.handleChange()} />
                        </InputGroup>
                    </div>
                    <Button variant="primary" onClick={() => this.startGame()}>Start </Button>
                    <br></br>
                    <span>{this.state.textInput}</span>
                </div>
            </div>
        )
    }
}

// style current word (grayish bar at top)
// correct letters (green background highlight)
// incorrect letters (red background highlight)
// current letter (blue bar at bottom)



export default Game;