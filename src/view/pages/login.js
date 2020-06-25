// use bootstrap modal
//https://react-bootstrap.github.io/components/modal/
import React, { Component, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
        }
    }
    handleClose = () => this.setState({showModal: false});
    // need to get rid of route, because it removes the stuff underneath
    // the modal, so need to make it an onClick instead
    render() {
        return (
            <Modal show={this.showModal} onHide={() => this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={() => this.handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

{/* <p>Username</p>
<p>Password</p>
<p>Forgot username</p>
<p>Forgot Passowrdf</p> */}

export default Login;