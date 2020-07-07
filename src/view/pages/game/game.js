import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Timer from "./wpm"
import CountDown from "./countdown";


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "Listen carefully, my friend. You are stuck in a paradox.",
            rawInput: React.createRef(),
            prompt: [],
            textInput: "",

            correctChars: 0,
            errorCnt: 0,

            isStarted: false,
            isFinished: false,

            timerCntr: 0,

            shouldCountDown: false,
            countDownSec: 5,
            // use this to get the initial state to reset the game
            // https://stackoverflow.com/questions/45200535/reset-initial-state-in-react-es6/45200755 
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
        this.state.prompt[this.state.prompt.length - 1].characters.pop();
    }

    handleChange() {
        var corCharCnt = 0;
        var incCharCnt = 0;
        let temp = this.state.rawInput.current.value;

        if (temp.size === 1) {
            this.setState({
                isStarted: true,
            });
        }

        var testChar = "";
        var corChar = "";
        var index = 0;
        var tempPrompt = this.state.prompt.slice();

        for (let i = 0; i < tempPrompt.length; i++) {
            tempPrompt[i].styling = "word";
            var characters = tempPrompt[i].characters;
            for (let j = 0; j < characters.length; j++) {
                corChar = characters[j].character;
                testChar = temp.charAt(index);

                if (testChar === "") {
                    tempPrompt[i].characters[j].styling = "character";
                } else if (testChar === corChar) {
                    tempPrompt[i].characters[j].styling = "character correct";
                    corCharCnt++;
                }
                else if (testChar !== corChar) {
                    tempPrompt[i].characters[j].styling = "character incorrect";
                    incCharCnt++;
                }

                if (index === temp.length) {
                    tempPrompt[i].characters[j].styling = "character current";
                    tempPrompt[i].styling = "word current"
                }
                index++;
            }
        }

        var finished = false;
        if (corCharCnt === this.state.quote.length) {
            finished = true;
            console.log("game finished");
        }

        this.setState({
            textInput: this.state.rawInput.current.value,
            prompt: tempPrompt,
            correctChars: corCharCnt,
            errorCnt: incCharCnt,
            isFinished: finished,
        });
    }

    countDown(num) {
        console.log(num);
        this.setState({
            countDownSec: num,
        });
        // if (num === 0) {
        //     this.startGame();
        // }
        /*
            need to figure out how to lift state up,
            bc apparently this.startGame() doesn't work from countdown?
        */
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.countDownSec);
        console.log(this.state.countDownSec);
        if (prevState.countDownSec !== this.state.countDownSec) {
            if (this.state.countDownSec === 0) {
                this.startGame();
            }
        }
    }

    handleCountDown() {
        this.setState({
            shouldCountDown: true,
            timerCntr: this.state.timerCntr + 1,
        });
    }

    startGame() {
        var tempPrompt = this.state.prompt.slice();
        tempPrompt[0].characters[0].styling = "character current";
        tempPrompt[0].styling = "word current";

        this.setState({
            isStarted: true,
            prompt: tempPrompt,
        });
    }

    render() {
        console.log(this.state.timerCntr);
        return (
            <div className="container">
                <div className="card-container">
                    <div className="game-info">
                        {this.state.isStarted ? <Timer
                            corChars={this.state.correctChars}
                            errorCnt={this.state.errorCnt}
                            isGameStarted={this.state.isStarted}
                            isGameFinished={this.state.isFinished}
                            key={this.state.timerCntr}/>
                            : <p className="filler">T</p>
                        }
                    </div>


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
                        {!this.state.shouldCountDown ?
                            <Button className="" size="lg" block variant="primary" onClick={() => this.handleCountDown()}>Start </Button>
                            :
                            <InputGroup size="lg">
                                <FormControl readOnly={this.state.isFinished || !this.state.isStarted}
                                    autoFocus aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Start typing..."
                                    ref={this.state.rawInput} type="text" onChange={() => this.handleChange()} />
                            </InputGroup>

                        }
                    </div>
                    <br></br>
                    {this.state.shouldCountDown ? <CountDown countDownSec={this.state.countDownSec}
                                                        countDownFn={this.countDown.bind(this)} /> : null}
                </div>
            </div>
        )
    }
}

// style current word (grayish bar at top)
// correct letters (green background highlight)
// incorrect letters (red background highlight)
// current letter (blue bar at bottom)
//             quote: "Listen carefully, my friend. You are stuck in a paradox. It turns out there are three things you cannot do in virtual reality. You cannot die, you cannot get grounded, and you cannot call customer service. This is why you are having problems.",



export default Game;