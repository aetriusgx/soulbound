const express = require('express');
const app = express();
const server = app.listen(5500);

app.use(express.static('public'));

console.log("Running");

const socket = require('socket.io');

const io = socket(server);

io.sockets.on('connection', newConnection); 

async function newConnection(socket) {
    console.log(`new connection ${socket.id}`);
    
    await socket.on('key', keyMsg);

    function keyMsg(data) {
        socket.broadcast.emit('key', data);
        console.log(data);

    }
}

