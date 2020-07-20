import React, { useRef, useState, useEffect } from 'react';
import { InputForm, FormControl, Button, InputGroup, Alert } from 'react-bootstrap';
import { Transition } from 'react-transition-group';


const GameCode = ({ gameID }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const textInputRef = useRef(null);

    const copyToClipboard = e => {
        textInputRef.current.select();
        document.execCommand("copy");
        setCopySuccess(true);
    }

    // useEffect(() => {
    //     setCopySuccess(false);
    // }, [copySuccess]);

    const duration = 300;
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }
    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    readOnly type="text" ref={textInputRef} value={gameID}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button type="button" variant="outline-success" onClick={copyToClipboard}>Copy Game Code</Button>
                </InputGroup.Append>
            </InputGroup>

            {copySuccess ?
            <Alert variant="success">Copied!</Alert>
            : null}


        </>
    )
}

export default GameCode;


