// Install default packages
const express = require('express');
const http = require('http');
const path = require('path')
const socketio  = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } =require('./utlis/message');
const {addUser,removeUser,getUser,getUserInRoom} = require('./utlis/users')


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

    // socket.emit('message',generateMessage('Welcome'));
    // socket.broadcast.emit('message',generateMessage('New user joined the chat'));

        // join room 
    socket.on('join',(userOption, callback)=>{
        const {error, user } = addUser({id : socket.id, ...userOption})
         if(error){
             return callback(error);
         }


        socket.join(user.room);
        socket.emit('message',generateMessage('Welcome'));
        socket.broadcast.to(room).emit('message',generateMessage(` ${user.username} has joined ! `));

        callback()
    })    

    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed');
        }
        io.to(user.room).emit('message',generateMessage(message)); // Broadcast to each screen
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })
    

    
    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',generateMessage(` ${user.username} has left`));
        }
        
    })


    
})

// Listen server on Defined Port
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})