# Typemania
**Author**: Gaurav Krishnan - [`gauravk2@illinois.edu`](mailto:example@illinois.edu)

## Project Goal
I developed this website to create something similar to TypeRacer by providing type-racing via singleplayer and multiplayer. Currently, the mutliplayer only supports game room invite codes instead of search-based game creation. The website allows you to type race with other users you invite or play by yourself. This project mainly served as a tool for me to learn web development and how to use the MERN stack.

Note: Quotes are fetched from [Quotable API](https://github.com/lukePeavey/quotable).
## Features
 - Singleplayer Mode
 - Multiplayer Mode (invite-link method)
 - Game Review that displays quote and author

---

## Tech Stack
 - React
 - Node.js
 - Express
 - MongoDB
 - Socketio
 - QuotableAPI

## Dependencies
| Back End  	| Front End (client folder) |
|-----------	|------------------------	|
| mongoose  	| React                  	|
| express   	| react-bootstrap        	|
| socketio  	| react-router-dom       	|
| dotenv    	| react-router-bootstrap 	|
| axios     	| socket.io-client       	|
| cross-env 	|                        	|
| nodemon   	|                        	|
---
## Installation / Setup
- First install npm and node as they are required to run the application.

- Now install all dependencies
    > Install backend dependencies
    ```shell
    $ cd scriptio (or project directory)
    $ npm install
    ```
    > Install front end dependencies
    ```shell
    $ cd client
    $ npm install
    ```
- Setup database
    -  Go to [mongoDB](https://www.mongodb.com/), create an account, and set up a free cluster.
    - In this repository the config.env files are .gitignored but you can create a .env file called `config.env` in the `config` folder and input the following
    ```
    PORT = <port number>
    MONGO_URI = <mongo_uri>
    ```
    - Replace the <port number> with the port you want to run the server on.
    - Replace <mongo_uri> with the link received from your Cluster dashboard on MongoDB by clicking "connect" then "Connect your application"
    - You can replace "test" with whatever name you want for your database.
    - Make sure to input your password.
---

## Local/Development Build
### Changes
 - Need to change socketio in client.
    - Navigate to `socketConfig.js` in the `client` folder
    - Replace the app url with the `PORT` number the server is running on.
        - Note: the react server (NOT the node.js server) runs on port 3001 by default
- Make sure the react server is running on a seperate port from the node.js server
### Scripts
 - For the server with `nodemon` run (from the main directory)
    ```shell
    $ npm run dev
    ```
- For the react build run
    ```shell
    $ cd client
    $ npm start
    ```
## Production/Deployment Build
 - If you followed up to this point and want to deploy, I used heroku to deploy this build.
 - I recommend following this [youtube tutorial](https://www.youtube.com/watch?v=71wSzpLyW9k) as is it explained simply.




