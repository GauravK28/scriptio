const express = require('express');
const app = express();

const socketio = require('socket.io');
const mongoose = require('mongoose');


const server = app.listen(3001, () => {
    console.log("server is running on port", server.address().port);
   });
const io = socketio(server);

const Game = require('./Models/Game');

mongoose.connect('mongodb://localhost:27017/scriptio',
                    {useNewUrlParser: true, useUnifiedTopology: true},
                    () => {console.log('successfully connected to database')});
