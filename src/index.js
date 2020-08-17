// Install default packages
const express = require('express');
const http = require('http');
const path = require('path')
const socketio  = require('socket.io');

// Take the instance of express Constructor
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Take default port or Enviornmental Port
const port = process.env.PORT || 3000


// Bring static code form public folder
const publicDirectoryPath = path.join(__dirname, '../public')

//Render public folder to UI
app.use(express.static(publicDirectoryPath))

let count = 0;
// Web socket connection
io.on('connection',(socket)=>{
    console.log('New Webscoket connection');

    socket.emit('countUpdated',count);
    socket.on('increment',()=>{
        count++;
        //socket.emit('countUpdated',count)
        io.emit('countUpdated',count); // Broadcast to each screen
    }
    )
})

// Listen server on Defined Port
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})