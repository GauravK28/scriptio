// npm run dev
const express = require('express');
const { createServer } = require('http')
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin:  '*',
    }
});

const dotenv = require('dotenv');
const path = require('path');
// Load config
dotenv.config({path : './config/config.env'})

const mongoose = require('mongoose');

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    // Load build index html file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

const connectDB = require('./config/db');
connectDB();

const Game = require('./Models/Game');
const QuoteRequest = require('./QuotableAPI');


io.on('connect', (socket) => {
    console.log("CONNECTED");

    socket.on('char-count', async ({corCharCnt, gameID}) => {
        try {
            let game = await Game.findById(gameID);
            if (!game.isOpen && !game.isOver) {
                let player = game.players.find(player => player.socketID === socket.id);
                player.correctChars = corCharCnt;

                let time = Date.now() - game.startTime;
                let wpm = Math.round((player.correctChars / 5) / (time / 1000 / 60));
                player.WPM = wpm;


                if (player.correctChars === game.quoteLength) {
                    player.isFinished = true;
                    socket.emit('finished');

                    let end = true;
                    game.players.forEach((player) => {
                        if (!player.isFinished) {
                            end = false;
                        }
                    });
                    if (end) {
                        game.isOver = true;
                    }
                }

                await game.save()
                    .then((savedGame) => {
                        io.to(gameID).emit('update-game', savedGame);
                    })
                    .catch( err => console.log(err));
            }
        } catch (error) {  
            console.log(error);
        }
    });

    socket.on('user-input', async ({gameID, userInput}) => {
        try {
            let game = await Game.findById(gameID);
            if (!game.isOpen && !game.isOver) {
                let player = game.players.find(player => player.socketID === socket.id);
                player.input = userInput;
                await game.save()
                .then((savedGame) => {
                    io.to(gameID).emit('update-game', savedGame);
                })
                .catch( err => console.log(err));
            }
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('timer', async ({gameID, playerID}) => {
        let countDown = 5;
        let game = await Game.findById(gameID);
        let player = game.players.id(playerID);
        if (player.isPartyLeader) {
            let timerID = setInterval(async () => {
                if (countDown >= 0) {
                    io.to(gameID).emit('timer', {countDown, msg : "Starting Game"});
                    countDown--;
                } else {
                    game.isOpen = false;
                    await game.save()
                    .then((savedGame) => {
                        io.to(gameID).emit('update-game', savedGame);
                        startGameClock(gameID);
                        clearInterval(timerID);
                    })
                    .catch( err => console.log(err));
                }
            }, 1000);
        }
    });

    socket.on('join-game', async ({ gameID: _id, nickName }) => {
        try {
            // Game.find((err, game) => {
            //     if (err) {
            //         return console.log(err);
            //     }
            // });

            let g = await Game.findById(_id).exec();

            if (g && g.isOpen) {
                const gameID = g._id.toString();
                socket.join(gameID);
                let player = {
                    socketID: socket.id,
                    isPartyLeader: false,
                    nickName
                }
                g.players.push(player);
                
                await g.save()
                .then((savedGame) => {
                    io.to(gameID).emit('update-game', savedGame);
                    console.log("PLAYER JOINED");
                })
                .catch( err => console.log(err));
            }
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('create-game', async (nickName) => {
        console.log('Creating game...');
        try {
            const quotableData = await QuoteRequest();

            let game = new Game();
            game.quote = quotableData.content;
            game.author = quotableData.author;
            game.words = quotableData.content.split(" ");
            game.quoteLength = quotableData.length;
            let player = {
                socketID: socket.id,
                isPartyLeader: true,
                nickName
            }
            game.players.push(player);

            await game.save()
            .then((savedGame) => {
                const gameID = savedGame._id.toString();
                console.log(savedGame._id);
                socket.join(gameID);
                io.to(gameID).emit('update-game', savedGame);
                console.log("GAME WAS CREATED");
            })
            .catch( err => console.log(err));

        } catch (error) {
            console.log(error);
        }
    });
});


const startGameClock = async (gameID) => {
    let game = await Game.findById(gameID).exec();
    game.startTime = new Date().getTime();
    await game.save()
    .then(console.log('Successfully started game.'))
    .catch( err => console.log(err));;

    let time = 120;
    let timerID = setInterval(function gameIntervalFunc() {
        if (time >= 0) {
            const formatTime = calculateTime(time);
            io.to(gameID).emit('timer', {countDown : formatTime});
            time--;
        } else {
            (async () => {
                let endTime = new Date().getTime();
                let game = await Game.findById(gameID);
                let {startTime} = game;
                game.isOver = true;
                game.players.forEach((player, index) => {
                    if (player.WPM === -1) {
                        game.players[index].WPM = calculateWPM(endTime, startTime, player);
                    }
                });
                await game.save()
                .then(console.log('Successfully updated player wpm.'))
                .catch( err => console.log(err));

                io.to(gameID).emit('update-game', game);
                clearInterval(timerID);
            })()
        }
        return gameIntervalFunc;
    }, 1000);
}

const calculateTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

}

const calculateWPM = (endTime, startTime, player) => {
    let numOfWords = player.currentWordIndex;
    const timeInSeconds = (endTime - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;
    const WPM = Math.floor(numOfWords / timeInMinutes);
    return WPM;
}