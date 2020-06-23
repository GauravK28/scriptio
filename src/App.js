import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import "bootstrap/dist/css/bootstrap.css";
import './App.css'; // CSS stylesheet

import Home from "./view/pages/home";
import Profile from "./view/pages/profile";
import Practice from "./view/pages/practice";
import Settings from "./view/pages/user-settings"


class App extends Component {
  render() {
    return (
      <Router>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>Scriptio</Navbar.Brand>
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/practice">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link >Practice</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/settings">
              <Nav.Link >Settings</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>

        <Switch>
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
        </Switch>
        {/* <Route path="/"  exact component={Home} />
          <Route path="/practice" component={Practice} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} /> */}

      </Router>
    );
  }
}

export default App;

//shift + alt + F
// import "bootstrap/dist/css/bootstrap.min.css";
