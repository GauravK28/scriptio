import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import './App.css'; // CSS stylesheet

import Home from "./view/pages/home";
import Profile from "./view/pages/profile";
import Practice from "./view/pages/practice";
import Settings from "./view/pages/user-settings";
import LoginModal from "./view/pages/loginModal";

import NavBar from "./view/navbar";
import socket from './socketConfig';

class App extends Component {
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
      <NavBar />
    );
  }
}

export default App;
