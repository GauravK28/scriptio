import React, {useState, Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldModalOpen: props.shouldModalOpen,
        }
    }

    componentWillMount() {
        this.setState({
            shouldModalOpen: this.props.shouldModalOpen,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                shouldModalOpen: nextProps.shouldModalOpen,
            });
        }
    }

    handleModalOpen = () => {
        this.setState((prevState) => {
            return {
                shouldModalOpen: !prevState.shouldModalOpen
            }
        })
    }

    render() {
        return (
            <>
                <Modal show={this.state.shouldModalOpen} onHide={this.handleModalOpen}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember Me" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <p>Forgot password?</p>
                        <Button variant="primary" onClick={this.handleModalOpen}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}


export default LoginModal;


// const LoginModal = props => {
//     const [shouldModalOpen, setshouldModalOpen] = useState(props.shouldModalOpen);
//     return (
//         <>
//                 <Modal show={shouldModalOpen} onHide={() => setshouldModalOpen(!shouldModalOpen)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Login</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form>
//                             <Form.Group controlId="formBasicEmail">
//                                 <Form.Label>Email address</Form.Label>
//                                 <Form.Control type="email" placeholder="Enter email" />
//                             </Form.Group>
//                             <Form.Group controlId="formBasicPassword">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control type="password" placeholder="Password" />
//                             </Form.Group>
//                             <Form.Group controlId="formBasicCheckbox">
//                                 <Form.Check type="checkbox" label="Remember Me" />
//                             </Form.Group>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <p>Forgot password?</p>
//                         <Button variant="primary" onClick={() => setshouldModalOpen(!shouldModalOpen)}>
//                             Login
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </>
//     )

// }