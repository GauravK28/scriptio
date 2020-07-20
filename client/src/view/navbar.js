import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


import LoginModal from "./pages/loginModal";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldLoginModalOpen: false,
    }
  }

  handleModalOpen = () => {
    this.setState((prevState) => {
      return {
        shouldLoginModalOpen: !prevState.shouldLoginModalOpen
      }
    })
  }

  render() {
    return (
      <Navbar bg="light" variant="light" >
        <div className="container">
          <Navbar.Brand >Typemania</Navbar.Brand>
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/practice">
              <Nav.Link >Practice</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/settings">
              <Nav.Link >Settings</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="ml-auto">
            <Nav.Link className="float-left" onClick={() => this.handleModalOpen()}>Login</Nav.Link>
          </Nav>
          <LoginModal
            shouldModalOpen={this.state.shouldLoginModalOpen}
          />
        </div>
      </Navbar>
    )
  }
}

export default NavBar;