import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Navbar, Nav, Form, FormControl, Button, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import "bootstrap/dist/css/bootstrap.css";
import  './App.css'; // CSS stylesheet

import Home from "./components/home";
import Profile from "./components/profile";
import Practice from "./components/practice";


class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Navbar bg="dark" variant="dark">
            <LinkContainer to="/">
              <Navbar.Brand href="#home">Scriptio</Navbar.Brand>
            </LinkContainer>
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
            </Nav>
          </Navbar>
          <Route path="/" exact component={Home} />
          <Route path="/practice" component={Practice} />
          <Route path="/profile" component={Profile} />
        </div>
  
      </Router>
    );
  }
}

export default App;

//shift + alt + F
// import "bootstrap/dist/css/bootstrap.min.css";
