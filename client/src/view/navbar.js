import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import Home from "./pages/home";
import Profile from "./pages/profile";
import Practice from "./pages/practice";
import Settings from "./pages/user-settings";
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
            <Router>
            <Navbar bg="light" variant="light" >
              <div className="container">
                <Navbar.Brand >Script.io</Navbar.Brand>
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
                  <Nav.Link className="float-left" onClick={this.handleModalOpen}>Login</Nav.Link>
                </Nav>
                <LoginModal
                  shouldModalOpen={this.state.shouldLoginModalOpen}
                />
              </div>
            </Navbar>
    
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/practice">
              <Practice />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
          </Router>
        )
    }
}

export default NavBar;