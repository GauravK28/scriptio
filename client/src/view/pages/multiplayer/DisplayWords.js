import React, { useEffect, useState } from 'react';

import socket from '../../../socketConfig';



const updateDisplay = (prompt, userInput, gameID) => {
    var corCharCnt = 0;
    var incCharCnt = 0;
    let temp = userInput;

    var testChar = "";
    var corChar = "";
    var index = 0;
    var tempPrompt = prompt.slice();

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
    
    socket.emit('char-count', { corCharCnt, gameID });

    // var finished = false;
    // if (corCharCnt === this.state.quote.length) {
    //     finished = true;
    //     this.state.status(finished);
    //     console.log("game finished");
    // }

    return tempPrompt;
}


const DisplayWords = ({ prompt, player, gameID }) => {
    const [promptState, setPromptState] = useState(prompt);
    useEffect(() => {
        setPromptState(updateDisplay(promptState, player.input, gameID));
    }, [player.input]);
    return (
        promptState.map((word, index) => (
            <span className={word.styling}>
                {word.characters.map((character, index2) => (
                    <span className={character.styling}>{character.character}</span>
                ))}
            </span>
        ))
    )
}

export default DisplayWords;

// user enters words into prompt
// server receives words and process what is correct
// server sends what the state of each letter to DisplayWords to display what user has done