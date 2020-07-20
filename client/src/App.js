import React, { useEffect, useState } from 'react';
import history from './history';
import {Router, Route, Switch } from 'react-router-dom';
import './App.css'; // CSS stylesheet

import NavBar from "./view/navbar";
import Home from "./view/pages/multiplayer/home";
import Profile from "./view/pages/profile";
import Practice from "./view/pages/practice";
import Settings from "./view/pages/user-settings";

import socket from './socketConfig';

import CreateGame from './view/pages/multiplayer/createGame';
import JoinGame from './view/pages/multiplayer/joinGame';

import GameEngine from './view/pages/multiplayer/GameEngine';

function App() {
  const [gameState, setGameState] = useState({ _id: "", isOpen: false, players: [], words: [] });

  useEffect(() => {
    socket.on('update-game', (game) => {
      console.log(game);
      setGameState(game); // async event
    });
    return () => {
      socket.removeAllListeners();
    }
  }, []);
  useEffect(() => {
    console.log(gameState._id);
    if (gameState._id !== "") {
      history.push(`/game/${gameState._id}`);
    }
  }, [gameState._id]);
  return (
    <>
    <Router history={history}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/game/create" component={CreateGame} />
        <Route path="/game/join" component={JoinGame} />
        <Route path="/game/:gameID" render={props => <GameEngine {...props } gameState={gameState}/>}/>

        <Route path="/practice" component={Practice} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </Router>
    </>
  )
}

export default App;