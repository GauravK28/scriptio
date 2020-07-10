const express = require('express');
const app = express();

const socketio = require('socket.io');
const mongoose = require('mongoose');

const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log("server is running on port", server.address().port);
   });
const io = socketio(server);


const Game = require('./Models/Game');
const QuoteRequest = require('./QuoteRequest');

mongoose.connect('mongodb://localhost:27017/scriptio',
                    {useNewUrlParser: true, useUnifiedTopology: true},
                    () => {console.log('successfully connected to database')});
