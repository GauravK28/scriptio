// npm run dev
const express = require('express');
const dotenv = require('dotenv');
// Load config
dotenv.config({path : './config/config.env'})

const app = express();

const socketio = require('socket.io');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
const io = socketio(server);

const connectDB = require('./config/db');
connectDB();


const Game = require('./Models/Game');
const QuoteRequest = require('./QuotableAPI');


io.on('connect', (socket) => {
    console.log("CONNECTED");

    socket.on('join-game', async ({ gameID: _id, nickName }) => {
        try {
            console.log("LOOK");
            Game.find((err, game) => {
                if (err) {
                    return console.log(err);
                }
                console.log(game);
            });

            console.log("going to join");
            console.log(_id);
            let g = await Game.findById(_id).exec();
            console.log(g);

            if (g.isOpen) {
                const gameID = g._id.toString();
                socket.join(gameID);
                let player = {
                    socketID: socket.id,
                    isPartyLeader: false,
                    nickName
                }
                g.players.push(player);
                g.save(function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log('Success!');
                });
                io.to(gameID).emit('update-game', g);
                console.log("PLAYER JOINED");
            }
        } catch (error) {
            console.log("here?");
            console.log(error);

        }
    });

    socket.on('create-game', async (nickName) => {
        try {
            console.log("Testing to make sure it is connected");
            mongoose.connection.on('error', function (err) {
                console.error('MongoDB error: %s', err);
            });

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
            await game.save((err) => {
                if (err) {
                    return console.log(err);
                }
                console.log('Success!');
            });

            const gameID = game._id.toString();
            console.log(game._id);
            socket.join(gameID);
            io.to(gameID).emit('update-game', game);
            console.log("GAME WAS CREATED");
            console.log(game);
        } catch (error) {
            console.log(error);
        }
    });
});