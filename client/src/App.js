import React, { useEffect, useState } from 'react';
import {Route, Routes, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('update-game', (game) => {
      console.log(game);
      setGameState(game); // async event
    });
    return () => {
      socket.off();
    }
  }, []);
  useEffect(() => {
    console.log(gameState._id);
    if (gameState._id !== "") {
      navigate(`/game/${gameState._id}`);
    }
  }, [gameState._id]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/create" element={<CreateGame />} />
        <Route path="/game/join" element={<JoinGame />} />
        <Route path="/game/:gameID" element={<GameEngine gameState={gameState} />} />

        <Route path="/practice" element={<Practice />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}

export default App;

