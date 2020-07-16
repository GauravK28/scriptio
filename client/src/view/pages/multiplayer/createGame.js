import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


import socket from '../../../socketConfig';

const CreateGame = props => {
    const [nickName, setNickName] = useState("");
    const onChange = e => {
        setNickName(e.target.value);
    }
    const onSubmit = e => {
        e.preventDefault();
        socket.emit('create-game', nickName);
    }
    return (
        <>
            <div className="container">
                <div className="card-container">
                    <h3>Create Game</h3>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control type="text" name="nickname" placeholder="Enter your nickname"
                                onChange={onChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => onSubmit()}>
                            Submit
                 </Button>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default CreateGame;