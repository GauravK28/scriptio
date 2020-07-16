import React, { useEffect, useState } from 'react';
import history from './history';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css'; // CSS stylesheet

import NavBar from "./view/navbar";
import socket from './socketConfig';
import CreateGame from './view/pages/multiplayer/createGame';

import Home from "./view/pages/multiplayer/home";
import Profile from "./view/pages/profile";
import Practice from "./view/pages/practice";
import Settings from "./view/pages/user-settings";

function App() {
  const [gameState, setGameState] = useState({ _id: "", isOpen: false, players: [], words: [] });
  useEffect(() => {
    socket.on('update-game', (game) => {
      console.log(game);
      setGameState(game);
      //history.pus
    });
  }, []);
  return (
    <Router>
      <NavBar history={history} />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/practice" component={Practice} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </Router>
  )
}

export default App;
