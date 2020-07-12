const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');

const port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../views/index.html'));
});

server.listen(3000, () => console.log(`server has been started on ${port} port`));


users = [];
connections = [];

io.sockets.on('connection', socket => {
    connections.push(socket);
    console.log('Успешное соеденение');

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Отключение');
    });

    socket.on('send mess', (data) => {
        io.sockets.emit('add mess', {
            mess: data.mess,
            name: data.name,
            className: data.className
        })
    })
});

