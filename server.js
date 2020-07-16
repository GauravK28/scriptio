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
const QuoteRequest = require('./QuotableAPI');

mongoose.connect('mongodb://localhost:27017/scriptio',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('successfully connected to database') });

io.on('connect', (socket) => {
    console.log("CONNECTED");

    socket.on('create-game', async (nickName) => {
        try {
            const quotableData = await QuoteRequest();

            let game = new Game();
            game.words = quotableData;
            let player = {
                socketID: socket.id,
                isPartyLeader: true,
                nickName
            }
            game.players.push(player);
            //game = await game.save();
            game.save(await function (err) {
                if (!err) console.log('Success!');
            });

            const gameID = game._id.toString();
            socket.join(gameID);
            io.to(gameID).emit('update-game', game);
            console.log("GAME WAS CREATED");
        } catch (error) {
            console.log(error);
        }
    });
});