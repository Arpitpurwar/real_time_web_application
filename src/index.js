// Install default packages
const express = require('express');
const http = require('http');
const path = require('path')
const socketio  = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } =require('./utlis/message')

// Take the instance of express Constructor
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const filter = new Filter();

// Take default port or Enviornmental Port
const port = process.env.PORT || 3000


// Bring static code form public folder
const publicDirectoryPath = path.join(__dirname, '../public')

//Render public folder to UI
app.use(express.static(publicDirectoryPath))

// Web socket connection
io.on('connection',(socket)=>{
    console.log('New Webscoket connection');

    socket.emit('message',generateMessage('Welcome'));
    socket.broadcast.emit('message',generateMessage('New user joined the chat'));

    socket.on('sendMessage',(message,callback)=>{
        
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed');
        }
        io.emit('message',generateMessage(message)); // Broadcast to each screen
        callback()
    })

    socket.on('sendLocation',(position,callback)=>{
        io.emit('message',generateMessage(`Location : ${position.Lat ,position.Long  }`));
        callback()
    })
    socket.on('disconnect',()=>{
        io.emit('message',generateMessage('User has left'));
    })
    
})

// Listen server on Defined Port
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})